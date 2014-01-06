class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Layouts

  #nothing - default application.html.erb
  #layout 'fluid_layout' - my layout name built with option fluid
  layout 'amelia'



  # Methods for all app

  # CACHE при загрузке страниц вызываемый в контроллере страницы


  # Update Cache из контроллера страницы - вряд ли нужно.
  # В методе read_cache При загрузке страницы кэш читаем а если его нет - он сразу записывается и все синхронно
  # А динамические обновления будут через AJAX
  def update_cache(key, value)

    obj = value

    obj[:time] = Time.now

    Rails.cache.write(key, obj)

  end
  helper_method :update_cache




  # При загрузке стр мы будем пробовать взять данные из кэша. иначе мы берем их из базы и сразу записываем в кэш

  # USER Cache
  def user_cache(key)

    #@data = Rails.cache.read(key)
    #
    #unless @data
    #  @data = 'here need db request'
    #end
    #@data

    # синхронно
    @user = Rails.cache.fetch(key) {
      # Здесь берем данные из базы если в кэше нет
      # они запишутся сразу в кэш и их вернет метод
      #@data = 'Here db info and this already in cache'


      # Берем юзера по его id
      # Если его еще нет то записываем с дефолтными значениями
      # и отдаем
      @user = User.where(id_vk: key)

      if @user.empty?
        @user = User.new id_vk: key, count: 0, props: {list: ''}
        @user.save
      else
        @user = @user.first
      end

      @user


    }


  end

  # Группы из кэша либо 0 - инфо, что в кэшэ их нет - получаем на фронт
  def groups_cache(key)

    @groups = Rails.cache.read(key)

    unless @groups
      @groups = 0
    end

    @groups

  end




  def just_read(key)

    @vars = Rails.cache.read(key)

    unless @vars
      @vars = 0
    end

    @vars
  end


  def plus_user(value)
    # users = [1,2,3,4]
    users = Rails.cache.read('users')



    if users
      users.delete(value)
      users << value
    else
      users = [value]
    end

    Rails.cache.write('users', users)


  end


  def delete_user(id_vk)
    res = Rails.cache.delete(id_vk)

  end





  def saveFile

    @bigtable = [1, 2, 3]
    doc = 'CRONTEST.csv'

    File.open('CRONTEST.csv', 'w') do |f|
      @bigtable.each do |row|
        f << row
      end
    end

    send_file(doc, :disposition => 'attachment')

  end


  #def toBase
  #
  #  # Берем список польз. которые зашли за некоторое время
  #  obj = just_read('users')
  #  new_obj = obj
  #  #@a = []
  #
  #  if obj != 0
  #    # Проходим по всем - и пишем в базу новые count и props
  #
  #    obj.each do |id_vk|
  #
  #      # Берем объект конкретного юзера из кэша
  #      user = just_read(id_vk)
  #
  #      if user != 0
  #
  #        # если есть время записи в кэш только тогда с ним работаем
  #        if user[:time]
  #
  #          last = user[:time] + 10*60
  #          now = Time.now
  #
  #          if  last < now
  #            # '10 min expire, rec base , clear cache'
  #
  #            # пишем
  #            if User.update(user[:id], count: user[:count], props: {list: user[:props][:list]})
  #
  #              # То что записалось удаляем из временного списка
  #              new_obj.delete(id_vk)
  #
  #              # из кэша самого юзера удаляем
  #              delete_user(id_vk)
  #
  #            end
  #
  #          end
  #
  #        end
  #
  #      end
  #
  #
  #    end
  #
  #    # Обновляем список после записи и удаления записанного из кэша
  #
  #    Rails.cache.write('users', new_obj)
  #
  #  end
  #
  #end


  # Cache helpers
  helper_method :update_cache
  helper_method :user_cache
  helper_method :groups_cache

  helper_method :just_read

  helper_method :plus_user
  helper_method :delete_user


  # Work helpers
  helper_method :saveFile

  # From cache to Base helper
  #helper_method :toBase

end
