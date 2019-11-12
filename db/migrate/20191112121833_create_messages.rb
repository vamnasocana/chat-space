class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :body
      t.string :image
      t.references :user, foregin_key: true
      t.references :group, foregin_key: true
      t.timestamps
    end
  end
end
