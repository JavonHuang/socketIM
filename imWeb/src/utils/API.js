const API={
  LOGIN:"/user/login",//登录
  USERREGISTERED:"/user/userRegistered",//用户注册
  UPDATE_USER_INFO_BY_USERID:"/user/updateUserInfoByUserId",//根据用户账号更新用户信息
  SEACH_BYUSERID:"/user/seachByUserId",//根据用户账号或昵称搜索用户
  GET_USER_FRIEND_BYID:"/friend/getUserFriendById",//根据用户账号获取好友列表
  SET_FRIEND_NOTENICKNAME:"/friend/setFriendNoteNickName",//设置好友备注
  DEL_FRIENDBY_CHATID:"/friend/delFriendByChatId",//根据单聊房号删除好友
  ADD_FRIEND_VERIFY:"/friend/addFriendVerify",//添加好友请求
  GET_FRIEND_VERIFY_LIST:"/friend/getFriendVerifyList",//获取所有好友请求
  UPDATE_FRIEND_VERIFY:"/friend/updateFriendVerify",//更新好友请求状态
  GET_SINGLE_CHAT_BY_USERID:"/chat/getSingleChatFriend",//根据用户账号获取聊天用户列表
  GET_SINGLE_CHAT_MSG_LIST:"/chat/getSingleChatMsgList",//根据单聊房号获取和好友的聊天信息列表
  UPDATE_SINGLE_READ:"/chat/updateSingleRead",//根据单聊房号和用户账号更新所有消息已读
  GET_FRIEND_TAG:"/tag/getFriendTag",//根据用户账号获取好友标签
  GET_ALL_FRIEND_TAG:"/tag/getAllFriendTag",//根据用户账号获取所有标签
  UPDATE_TAG:"/tag/updateTag",//更新好友标签
  SET_TAG:"/tag/setTag",//修改标签名称
  DEL_TAG:"/tag/delTag",//删除标签
  GET_TAG_FRIENDLIST:"/tag/getTagFriendList",//获取标签成员
  DEL_FRIEND_TAG:"/tag/delFriendTag",//将好友移出标签
  UPDATE_TAGITEM:"/tag/updateTagItem",//设置标签的成员
  ADD_GROUP_HOME:"/group/addGroupHome",//添加群聊房间
  GET_GROUP_HOME_LIST:"/group/getGroupHomeList",//获取用户所参与的群房间
  GET_GROUP_MESSAGE_LIST:"/group/getGroupMessageList",//获取群聊消息列表
  REDUCEUNREAD:"/group/reduceUnread",//群未读消息置零
  GET_GROUP_USER_LIST:"/group/getGroupUserList",//获取群内所有群成员
  DEL_GROUP_USER:"/group/delGroupUser",//删除群成员
  ADD_GROUP_USER:"/group/addGroupUser",//添加群成员
  UPDATE_GROUP_HOME:"/group/updateGroupHome",//更新群信息
}

export default API;