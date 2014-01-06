def cache_read(key)

  vars = Rails.cache.read(key)

  unless vars
    vars = 0
  end

  vars

end

def toBase

  # Берем список польз. которые зашли за некоторое время
  obj = cache_read('users')
  new_obj = obj
  #@a = []

  if obj != 0
    # Проходим по всем - и пишем в базу новые count и props

    obj.each do |id_vk|

      # Берем объект конкретного юзера из кэша
      user = cache_read(id_vk)

      if user != 0

        # если есть время записи в кэш только тогда с ним работаем
        if user[:time]

          last = user[:time] + 10*60
          now = Time.now

          if  last < now
            # '10 min expire, rec base , clear cache'

            # пишем
            if User.update(user[:id], count: user[:count], props: {list: user[:props][:list]})

              # То что записалось удаляем из временного списка
              new_obj.delete(id_vk)

              # из кэша самого юзера удаляем
              delete_user(id_vk)

            end

          end

        end

      end


    end

    # Обновляем список после записи и удаления записанного из кэша

    Rails.cache.write('users', new_obj)

  end

end

desc 'Every 10 minute rec in base and clear cache User older then 10 min'

task from_cache_to_base: :environment do

  toBase


end



task send_mail: :environment do

  UserMailer.welcome_email.deliver

end
