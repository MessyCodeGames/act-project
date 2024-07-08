# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_07_08_142950) do
  create_table "acts", force: :cascade do |t|
    t.integer "act_value"
    t.datetime "act_time"
    t.integer "patient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_acts_on_patient_id"
  end

  create_table "heparins", force: :cascade do |t|
    t.integer "bolus_given"
    t.string "bolus_time"
    t.string "datetime"
    t.integer "patient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_heparins_on_patient_id"
  end

  create_table "patients", force: :cascade do |t|
    t.integer "weight"
    t.integer "act_target"
    t.integer "delta_t_bolus"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "recommandations", force: :cascade do |t|
    t.integer "new_loading_dose"
    t.integer "new_maintenance_bolus"
    t.datetime "new_maintenance_bolus_time"
    t.integer "patient_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id"], name: "index_recommandations_on_patient_id"
  end

  add_foreign_key "acts", "patients"
  add_foreign_key "heparins", "patients"
  add_foreign_key "recommandations", "patients"
end
