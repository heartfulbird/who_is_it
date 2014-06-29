class AddVisitsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :visits, :integer
  end
end
