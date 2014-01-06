module ApplicationHelper

  def toBase

    # Берем список польз. которые зашли за некоторое время
    obj = just_read('users')
    new_obj = obj
    #@a = []

    if obj != 0
      # Проходим по всем - и пишем в базу новые count и props

      obj.each do |id_vk|

        # Берем объект конкретного юзера из кэша
        user = just_read(id_vk)

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

end
