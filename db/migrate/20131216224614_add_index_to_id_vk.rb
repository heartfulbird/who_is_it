class AddIndexToIdVk < ActiveRecord::Migration
  def change
    add_index :users, [:id_vk]
  end
end
