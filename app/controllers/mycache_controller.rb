class MycacheController < ApplicationController


  # Работа с кэшем из js по ajax

  # USER DATA
  def get_data

     # берем данные из кэша
    @data = user_cache(params[:key])

     # Отдаем их
     render json: @data.to_json

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

end
