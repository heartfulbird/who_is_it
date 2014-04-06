class RatingController < ApplicationController

  def index

    @users = User.order(count: :desc)


  end

end
