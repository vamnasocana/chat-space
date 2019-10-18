# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### groups_usersテーブルのAssociation
- belongs_to :group
- belongs_to :user



## groupテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false|

### groupテーブルのAssociation
- has_many :groups_users
- has_many :users, through: :groups_users



## userテーブル

|Column|Type|Options|
|------|----|-------|
|username|string|null: false, add_index :user, :name|
|email|string|null: false, unique: true|

### userテーブルのAssociation
- has_many :groups_users
- has_many :groups, through: :groups_users


## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### messageテーブルのAssociation
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :users, through: :groups_users
