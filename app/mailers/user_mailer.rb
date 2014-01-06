class UserMailer < ActionMailer::Base
  default from: "from@example.com"


  def welcome_email
    @url = 'http://mail.google.com'
    @email = 'stassavickii@gmail.com'
    mail(to: @email, subject: 'Welcome to My Awesome Site')
  end

end
