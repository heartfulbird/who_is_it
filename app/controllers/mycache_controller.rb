class MycacheController < ApplicationController


  # Работа с кэшем из js по ajax

  # USER DATA
  def get_data

    Rollbar.report_message("GET DATA START #{params[:vk_id]}", "info", vk_id: params[:vk_id], time: Time.now)


    # берем данные из кэша
    @data = user_cache(params[:vk_id], params[:fio], params[:photo])

     # Отдаем их
     render json: @data.to_json

    #render json: params[:vk_id]

    Rollbar.report_message("GET DATA END   #{params[:vk_id]}", "info", vk_id: params[:vk_id], time: Time.now)

  end


  def write_data

    # обновляем кэш
    @data = update_cache(params[:key], params[:value])

    # Отдаем результат записи (true/false)
    render json: @data.to_json

  end



  def only_read
    @data = just_read(params[:key])
    render json: @data.to_json
  end

  def enter_users
    @data = plus_user(params[:key])
    render json: @data.to_json
  end

  # Пользователи в базе
  def check_users

    if params[:key]
      @users = User.find(params[:key])
    end
    #
    #@users = User.all


  end

  def clear_users
    if params[:key]
      if params[:key] == 'all'
        @result = User.destroy_all
      else
        @result = User.find(params[:key]).destroy
      end

      render json: @result.to_json
    end

  end

end
