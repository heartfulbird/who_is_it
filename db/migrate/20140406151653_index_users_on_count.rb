class IndexUsersOnCount < ActiveRecord::Migration
  def change
    add_index :users, :count
  end
end
