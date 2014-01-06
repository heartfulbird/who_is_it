

namespace :rec do

  desc "Do it every minute"
  task tobase: :environment do
    #Searcher.find_notify(User)


    @bigtable = [1, 2, 3]
    doc = "wyniki.csv"

    File.open("wyniki.csv", "w") do |f|
      @bigtable.each do |row|
        f << row
      end
    end

    send_file(doc, :disposition => 'attachment')

  end




end
