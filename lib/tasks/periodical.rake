

namespace :rec do



  desc 'Do it every minute'

  task tobase: :environment do
    #Searcher.find_notify(User)


    @bigtable = [1, 2, 3]
    doc = 'CRONTEST.csv'

    File.open('CRONTEST.csv', 'w') do |f|
      @bigtable.each do |row|
        f << row
      end
    end

    send_file(doc, :disposition => 'attachment')

  end




end
