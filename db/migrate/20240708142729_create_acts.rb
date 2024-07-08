class CreateActs < ActiveRecord::Migration[7.1]
  def change
    create_table :acts do |t|
      t.integer :act_value
      t.datetime :act_time
      t.references :patient, null: false, foreign_key: true

      t.timestamps
    end
  end
end
