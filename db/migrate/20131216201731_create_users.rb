class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :id_vk
      t.integer :count

      t.timestamps
    end
  end
end
