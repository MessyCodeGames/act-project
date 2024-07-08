class CreatePatients < ActiveRecord::Migration[7.1]
  def change
    create_table :patients do |t|
      t.integer :weight
      t.integer :act_target
      t.integer :delta_t_bolus

      t.timestamps
    end
  end
end
