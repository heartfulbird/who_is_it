class WelcomeController < ApplicationController

  def index

    # Есть группы в кэшэ если есть берем если нет - инфо что нет - на фронтэнде будем делать фпи запрос
    #@groups_info = groups_cache('hot')

    @hot = groups_cache('hot')
    @dance = groups_cache('dance')
    @world = groups_cache('world')


    # Доступность в js
    #gon.groups_info = @groups_info

    gon.hot = @hot
    gon.dance = @dance
    gon.world = @world

    if Rails.env == 'production'
      gon.env = 'production'
    else
      gon.env = 'other'
    end

    # jbuilder + команда gon.jbuilder + файл get_data.json.jbuilder - не нужны чтобы использовать gon
    # возможно это надо для авто преобразования данных из базы в удобный формат для js
    # например когда будет
    # @users = User.all
    #gon.jbuilder
    #- даст в js объект соответсвующий данным из базы при указании в get_data.json.jbuilder
    # json.users @users, id, name  ...



    #toBase_check

    #savefile
    #compareTime
    #UserMailer.welcome_email.deliver
  end
  # Index end














  def savefile

    @bigtable = [1, 2, 3]
    doc = "wyniki.csv"
    #File.open(doc, "w", :type => 'text/html; charset=utf-8') { |f| f << @bigtable }

    File.open("wyniki.csv", "w") do |f|
      @bigtable.each do |row|
        f << row
      end
    end

    send_file(doc, :disposition => 'attachment')

  end


  def compareTime
    a = Time.now

    b = Time.now + 10*60

    #@data = a > b

    obj = {k: 10, x: 17}

    obj[:a] =  a

    #@data = obj

    update_cache('time', obj)

    read_obj = just_read('time')

    read_a = read_obj[:a]

    #@data = read_a < b


    # на шаге получения кэша конкретного юзера
    user = just_read(111)

    # если есть время записи в кэш только тогда с ним работаем
    if user[:time]
      @orig = user[:time]
      @last = user[:time] + 2*60
      @now = Time.now

      if  @last < @now
        @data = '10 min expire, rec base , clear cache'
      else
        @data = 'not expire, dont touch'
      end


    end

  end


  def toBase_check

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

              # пишем     попробовать просто User.update(user) [хотя по идее update(user[:id] - это говорит куда сохранять
              # или User.update(user[:id], count: user[:count], props: user[:props])
              #if User.update(user[:id], count: user[:count], props: {list: user[:props][:list]})
              if User.update(user[:id], count: user[:count], props: user[:props])

                # То что записалось удаляем из временного списка
                new_obj.delete(id_vk)

                # из кэша самого юзера удаляем
                Rails.cache.delete(id_vk)

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
# Class End

# Так можно записать в кэш из контроллера
#update_cache('user_info', ' its NEW cache info, key: user_info')
#@upd_cache_info = update_cache('user_info', ' its NEW!!! cache info, key: user_info')


#  При создании юзера
#  id_vk: ..., count: 0, props: {list: []}

#  u = User.new id_vk: 111, count: 0, props: {list: []}
#  u.save

#  maybe can save props this way User.save(props: '{count: 55}')
#  get:  u = User.where(id_vk: 555)


#  Update
#  u = User.where(id_vk: 111)
#  u.new(count: '1', props)


# Объект всх кто зашел в приложение. Номер 4, 7 - id пользователей
#@data = {
#          4 => { vk_id: 7 },
#          7 => { vk_id: 1 }
#        }

#@data = {
#    4 => {vk_id: 7},
#    7 => {vk_id: 1}
#}

#a = ["a", "b", "b", "b", "c"]
#a.delete("b")
#@a = a

#a = ['a', 'b', 8]
#
#a.delete(5)
#
#a << 200
#
#@a = a

#@data.each_with_index do |obj, index|
#  # индекс по порядку итерации
#  i = index
#
#  # id пользователя
#  id     = obj[0]
#
#  # id_vk
#  id_vk  = obj[1][:vk_id]
#
#end


#@data = [
#    [4, 7],
#    [6, 12]
#
#]


#u = User.where(id_vk: 111)
#u.new(count: data, props)
#
