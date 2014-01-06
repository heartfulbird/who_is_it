class WelcomeController < ApplicationController

  def index

    # Есть группы в кэшэ если есть берем если нет - инфо что нет - на фронтэнде будем делать фпи запрос
    @groups_info = groups_cache('hot')

    # Доступность в js
    gon.groups_info = @groups_info


    # jbuilder + команда gon.jbuilder + файл get_data.json.jbuilder - не нужны чтобы использовать gon
    # возможно это надо для авто преобразования данных из базы в удобный формат для js
    # например когда будет
    # @users = User.all
    #gon.jbuilder
    #- даст в js объект соответсвующий данным из базы при указании в get_data.json.jbuilder
    # json.users @users, id, name  ...


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


    #toBase
    #savefile
  end


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

          #@a << user[:id]

          # пишем
          if User.update(user[:id], count: user[:count], props: {list: user[:props][:list]})

            # То что записалось удаляем из временного списка
            new_obj.delete(id_vk)

            # из кэша самого юзера удаляем
            delete_user(id_vk)

          end


        end


      end

      # Обновляем список после записи и удаления записанного из кэша

      Rails.cache.write('users', new_obj)

    end

  end



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


end
