class RatingController < ApplicationController

  def index

    @users = User.order(count: :desc).limit(100)

    @vk_id = params[:vk_id]

    @user =  User.find_by_id_vk(@vk_id)

    gon.page = 'rating'
    gon.user = @user
  end

end
