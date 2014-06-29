class AddPrcompanyToUsers < ActiveRecord::Migration
  def change
    add_column :users, :pr_company, :string

    add_index :users, :pr_company
  end
end
