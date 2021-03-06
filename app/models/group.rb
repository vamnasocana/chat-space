class Group < ApplicationRecord
  has_many :groups_users
  has_many :users, through: :groups_users
  validates :name, presence: true, uniqueness: true
  has_many :messages
  
  def show_last_message
    if (last_message = messages.last).present?
      last_message.body? ? last_message.body : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

end
