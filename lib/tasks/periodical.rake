

desc 'Every 10 minute rec in base and clear cache User older then 10 min'

task from_cache_to_base: :environment do

  toBase

end



task send_mail: :environment do

  UserMailer.welcome_email.deliver

end
