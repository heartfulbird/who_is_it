class AddPropsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :props, :hstore
  end
end
