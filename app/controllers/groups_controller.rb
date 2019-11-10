class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def index
  end
  
  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  # def edit    
  #   @group = Group.find(params[:id])
  # end

  # Railsでは、ルーティングとルーティングに対応するビューさえあれば、
  # 明示的にコントローラのアクションを定義しなくても、
  # ビューを表示することができます。
  # 唯一行なっていたインスタンス変数の定義は、before_actionで切り出し済み


  def update
    if @group.update(group_params)
      redirect_to root_path, notice: 'グループを更新しました'
    else
      render :edit
    end
  end

  # ↑11/10必ず後で確認：root_pathではなくgroup_messages_path(@group)かも

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [] )
  end
  def set_group
    @group = Group.find(params[:id])
  end
end
