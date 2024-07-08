require "test_helper"

class HeparinesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get heparines_new_url
    assert_response :success
  end

  test "should get create" do
    get heparines_create_url
    assert_response :success
  end

  test "should get update" do
    get heparines_update_url
    assert_response :success
  end

  test "should get edit" do
    get heparines_edit_url
    assert_response :success
  end

  test "should get destroy" do
    get heparines_destroy_url
    assert_response :success
  end

  test "should get index" do
    get heparines_index_url
    assert_response :success
  end

  test "should get show" do
    get heparines_show_url
    assert_response :success
  end
end
