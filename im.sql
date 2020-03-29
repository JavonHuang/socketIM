/*
 Navicat Premium Data Transfer

 Source Server         : myMac
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost:3306
 Source Schema         : im

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 30/03/2020 00:13:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat_message
-- ----------------------------
DROP TABLE IF EXISTS `chat_message`;
CREATE TABLE `chat_message` (
  `messageid` int(10) NOT NULL AUTO_INCREMENT COMMENT '聊天信息号',
  `chatid` int(10) NOT NULL COMMENT '单聊房间号',
  `fromuserid` int(8) NOT NULL COMMENT '发送方账号',
  `touserid` int(8) NOT NULL COMMENT '接收方账号',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:文本；1:图片;2:文件;',
  `text` varchar(255) CHARACTER SET utf8mb4 NOT NULL COMMENT '消息文本',
  `read` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:未读;1:已读;',
  `createtime` timestamp NULL DEFAULT NULL COMMENT '发送时间',
  PRIMARY KEY (`messageid`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chat_message
-- ----------------------------
BEGIN;
INSERT INTO `chat_message` VALUES (120, 1000000004, 10000002, 10000001, 0, '8', 1, '2020-03-28 00:25:04');
INSERT INTO `chat_message` VALUES (121, 1000000005, 10000001, 10000003, 0, '9090', 1, '2020-03-28 00:34:45');
INSERT INTO `chat_message` VALUES (122, 1000000005, 10000003, 10000001, 0, '989', 1, '2020-03-28 00:35:01');
INSERT INTO `chat_message` VALUES (123, 1000000005, 10000001, 10000003, 0, '89', 0, '2020-03-29 17:51:42');
INSERT INTO `chat_message` VALUES (124, 1000000005, 10000001, 10000003, 0, '34', 0, '2020-03-29 19:32:00');
INSERT INTO `chat_message` VALUES (125, 1000000004, 10000001, 10000002, 0, '😪', 1, '2020-03-29 21:47:23');
INSERT INTO `chat_message` VALUES (126, 1000000004, 10000002, 10000001, 0, '😫', 1, '2020-03-29 21:48:02');
INSERT INTO `chat_message` VALUES (127, 1000000004, 10000001, 10000002, 0, '💩', 1, '2020-03-29 21:48:09');
INSERT INTO `chat_message` VALUES (128, 1000000004, 10000002, 10000001, 0, '🤢', 1, '2020-03-29 21:50:31');
INSERT INTO `chat_message` VALUES (129, 1000000004, 10000002, 10000001, 0, '😳', 1, '2020-03-29 21:50:43');
INSERT INTO `chat_message` VALUES (130, 1000000004, 10000001, 10000002, 0, '😟😐', 1, '2020-03-29 21:52:53');
COMMIT;

-- ----------------------------
-- Table structure for errmsg
-- ----------------------------
DROP TABLE IF EXISTS `errmsg`;
CREATE TABLE `errmsg` (
  `code` int(5) NOT NULL,
  `msg` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of errmsg
-- ----------------------------
BEGIN;
INSERT INTO `errmsg` VALUES (300, 'token验证失败');
INSERT INTO `errmsg` VALUES (10000, '账号或密码错误');
INSERT INTO `errmsg` VALUES (10001, '旧密码与账号不符');
INSERT INTO `errmsg` VALUES (10002, '用户信息获取失败');
INSERT INTO `errmsg` VALUES (30001, '非法标签号');
COMMIT;

-- ----------------------------
-- Table structure for friend_note
-- ----------------------------
DROP TABLE IF EXISTS `friend_note`;
CREATE TABLE `friend_note` (
  `userid` int(8) NOT NULL COMMENT '用户账号',
  `friendid` int(8) NOT NULL COMMENT '好友账号',
  `notenickname` varchar(255) DEFAULT NULL COMMENT '备注名称',
  PRIMARY KEY (`userid`,`friendid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friend_note
-- ----------------------------
BEGIN;
INSERT INTO `friend_note` VALUES (10000001, 10000002, '基友');
COMMIT;

-- ----------------------------
-- Table structure for friend_tag
-- ----------------------------
DROP TABLE IF EXISTS `friend_tag`;
CREATE TABLE `friend_tag` (
  `tagid` int(10) NOT NULL COMMENT '标签自增流水号',
  `userid` int(8) NOT NULL COMMENT '用户账号',
  `friendid` int(8) NOT NULL COMMENT '好友账号',
  PRIMARY KEY (`tagid`,`userid`,`friendid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friend_tag
-- ----------------------------
BEGIN;
INSERT INTO `friend_tag` VALUES (1000000002, 10000001, 10000002);
COMMIT;

-- ----------------------------
-- Table structure for friend_verify
-- ----------------------------
DROP TABLE IF EXISTS `friend_verify`;
CREATE TABLE `friend_verify` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增流水号',
  `fromuserid` int(8) NOT NULL COMMENT '发起人账号',
  `touserid` int(8) NOT NULL COMMENT '接收人账号',
  `status` int(1) NOT NULL COMMENT '0:未通过;1:已通过;2:已拒绝',
  `verify` varchar(255) DEFAULT NULL COMMENT '验证信息',
  `createtime` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of friend_verify
-- ----------------------------
BEGIN;
INSERT INTO `friend_verify` VALUES (10, 10000001, 10000002, 1, NULL, '2020-03-28 00:23:18');
INSERT INTO `friend_verify` VALUES (11, 10000001, 10000003, 1, NULL, '2020-03-28 00:34:13');
COMMIT;

-- ----------------------------
-- Table structure for group_home
-- ----------------------------
DROP TABLE IF EXISTS `group_home`;
CREATE TABLE `group_home` (
  `homeid` int(10) NOT NULL COMMENT '群聊房间号',
  `createby` int(8) NOT NULL COMMENT '创建人账号',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `max` int(3) DEFAULT '100' COMMENT '人数上限',
  `homename` varchar(10) DEFAULT NULL COMMENT '房间名称',
  `notice` varchar(50) DEFAULT NULL COMMENT '公告',
  PRIMARY KEY (`homeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of group_home
-- ----------------------------
BEGIN;
INSERT INTO `group_home` VALUES (1000000001, 10000002, '2020-03-29 22:37:00', 99, '单身狗34', '请勿发广告');
INSERT INTO `group_home` VALUES (1000000007, 10000001, '2020-03-29 23:22:13', 100, '前端车队01', '不要发广告');
INSERT INTO `group_home` VALUES (1000000008, 10000001, '2020-03-29 23:22:27', 100, '前端车队02', '禁止发送广告');
INSERT INTO `group_home` VALUES (1000000009, 10000001, '2020-03-29 23:22:55', 100, '前端车队03', '禁止发广告');
COMMIT;

-- ----------------------------
-- Table structure for group_message
-- ----------------------------
DROP TABLE IF EXISTS `group_message`;
CREATE TABLE `group_message` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '消息流水号',
  `homeid` int(10) NOT NULL COMMENT '群聊房间号',
  `fromuserid` int(8) NOT NULL COMMENT '发送方账号',
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0:文本；1:图片;2:文件;',
  `text` varchar(50) NOT NULL COMMENT '消息文本',
  `createtime` timestamp NULL DEFAULT NULL COMMENT '发送时间',
  PRIMARY KEY (`id`,`homeid`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of group_message
-- ----------------------------
BEGIN;
INSERT INTO `group_message` VALUES (1, 1000000001, 10000001, 0, '测试消息', '2020-03-29 00:27:46');
INSERT INTO `group_message` VALUES (2, 1000000001, 10000001, 0, '测试消息', '2020-03-29 00:27:59');
INSERT INTO `group_message` VALUES (3, 1000000001, 10000002, 0, '测试消息', '2020-03-29 00:27:59');
INSERT INTO `group_message` VALUES (4, 1000000001, 10000001, 0, '😕', '2020-03-29 17:21:35');
INSERT INTO `group_message` VALUES (5, 1000000001, 10000001, 0, '😭', '2020-03-29 17:21:57');
INSERT INTO `group_message` VALUES (6, 1000000001, 10000001, 0, '👿', '2020-03-29 17:23:17');
INSERT INTO `group_message` VALUES (7, 1000000001, 10000001, 0, '😕', '2020-03-29 17:25:51');
INSERT INTO `group_message` VALUES (8, 1000000001, 10000001, 0, '🤓', '2020-03-29 17:31:15');
INSERT INTO `group_message` VALUES (9, 1000000001, 10000001, 0, '🤓', '2020-03-29 17:32:16');
INSERT INTO `group_message` VALUES (10, 1000000001, 10000001, 0, '😥', '2020-03-29 17:36:22');
INSERT INTO `group_message` VALUES (11, 1000000001, 10000001, 0, '🤓', '2020-03-29 17:36:40');
INSERT INTO `group_message` VALUES (12, 1000000001, 10000001, 0, '876', '2020-03-29 17:40:39');
INSERT INTO `group_message` VALUES (13, 1000000001, 10000001, 0, '89', '2020-03-29 17:44:56');
INSERT INTO `group_message` VALUES (14, 1000000001, 10000001, 0, 'r', '2020-03-29 17:45:38');
INSERT INTO `group_message` VALUES (15, 1000000001, 10000001, 0, '90', '2020-03-29 17:46:21');
INSERT INTO `group_message` VALUES (16, 1000000001, 10000001, 0, 're', '2020-03-29 17:48:59');
INSERT INTO `group_message` VALUES (17, 1000000001, 10000001, 0, '0', '2020-03-29 17:50:19');
INSERT INTO `group_message` VALUES (18, 1000000007, 10000001, 0, '89', '2020-03-29 17:52:01');
INSERT INTO `group_message` VALUES (19, 1000000007, 10000001, 0, '34', '2020-03-29 19:31:56');
INSERT INTO `group_message` VALUES (20, 1000000008, 10000001, 0, '343434', '2020-03-29 19:32:05');
INSERT INTO `group_message` VALUES (21, 1000000008, 10000001, 0, '35533😕', '2020-03-29 19:32:07');
INSERT INTO `group_message` VALUES (22, 1000000009, 10000001, 0, '😂😌', '2020-03-29 19:32:20');
INSERT INTO `group_message` VALUES (23, 1000000009, 10000001, 0, '👿', '2020-03-29 19:32:21');
INSERT INTO `group_message` VALUES (24, 1000000009, 10000001, 0, '😡', '2020-03-29 19:32:24');
INSERT INTO `group_message` VALUES (25, 1000000009, 10000001, 0, '34345他', '2020-03-29 19:32:27');
INSERT INTO `group_message` VALUES (26, 1000000009, 10000001, 0, '😭', '2020-03-29 20:24:56');
INSERT INTO `group_message` VALUES (27, 1000000009, 10000001, 0, '😱', '2020-03-29 20:30:27');
INSERT INTO `group_message` VALUES (28, 1000000008, 10000001, 0, '😟', '2020-03-29 20:30:39');
INSERT INTO `group_message` VALUES (29, 1000000008, 10000001, 0, '😟😴', '2020-03-29 20:30:43');
INSERT INTO `group_message` VALUES (30, 1000000008, 10000001, 0, '😪', '2020-03-29 20:30:54');
INSERT INTO `group_message` VALUES (31, 1000000009, 10000001, 0, '😍', '2020-03-29 20:31:26');
INSERT INTO `group_message` VALUES (32, 1000000009, 10000001, 0, '😷', '2020-03-29 20:31:33');
INSERT INTO `group_message` VALUES (33, 1000000009, 10000001, 0, '👹', '2020-03-29 20:31:38');
INSERT INTO `group_message` VALUES (34, 1000000009, 10000001, 0, '👹', '2020-03-29 20:31:46');
INSERT INTO `group_message` VALUES (35, 1000000009, 10000001, 0, '😣', '2020-03-29 20:47:03');
INSERT INTO `group_message` VALUES (36, 1000000001, 10000002, 0, '0', '2020-03-29 21:37:40');
INSERT INTO `group_message` VALUES (37, 1000000001, 10000002, 0, '89', '2020-03-29 21:37:46');
INSERT INTO `group_message` VALUES (38, 1000000008, 10000001, 0, '💀', '2020-03-29 21:47:31');
INSERT INTO `group_message` VALUES (39, 1000000008, 10000002, 0, '😍😪', '2020-03-29 21:48:26');
INSERT INTO `group_message` VALUES (40, 1000000008, 10000002, 0, '😤', '2020-03-29 21:49:36');
INSERT INTO `group_message` VALUES (41, 1000000008, 10000002, 0, '🤤', '2020-03-29 21:50:12');
INSERT INTO `group_message` VALUES (42, 1000000008, 10000002, 0, '☠️', '2020-03-29 21:50:18');
INSERT INTO `group_message` VALUES (43, 1000000007, 10000002, 0, '😍', '2020-03-29 21:50:56');
INSERT INTO `group_message` VALUES (44, 1000000007, 10000002, 0, '🤢', '2020-03-29 21:51:12');
INSERT INTO `group_message` VALUES (45, 1000000007, 10000001, 0, '🤔', '2020-03-29 21:51:17');
INSERT INTO `group_message` VALUES (46, 1000000007, 10000001, 0, '😷', '2020-03-29 21:51:36');
INSERT INTO `group_message` VALUES (47, 1000000007, 10000001, 0, '😊', '2020-03-29 21:51:56');
INSERT INTO `group_message` VALUES (48, 1000000007, 10000001, 0, '😮', '2020-03-29 21:52:42');
INSERT INTO `group_message` VALUES (49, 1000000007, 10000001, 0, '😭😧', '2020-03-29 21:52:44');
INSERT INTO `group_message` VALUES (50, 1000000007, 10000001, 0, '😭😧', '2020-03-29 21:52:45');
INSERT INTO `group_message` VALUES (51, 1000000001, 10000001, 0, '🤤😕', '2020-03-29 21:52:59');
INSERT INTO `group_message` VALUES (52, 1000000007, 10000002, 0, '😩😌😴', '2020-03-29 21:53:12');
INSERT INTO `group_message` VALUES (53, 1000000007, 10000001, 0, '😖', '2020-03-29 21:56:52');
INSERT INTO `group_message` VALUES (54, 1000000007, 10000002, 0, '😳', '2020-03-29 23:09:33');
INSERT INTO `group_message` VALUES (55, 1000000009, 10000001, 0, '👹', '2020-03-29 23:24:13');
COMMIT;

-- ----------------------------
-- Table structure for group_user
-- ----------------------------
DROP TABLE IF EXISTS `group_user`;
CREATE TABLE `group_user` (
  `homeid` int(10) NOT NULL COMMENT '群聊房间号',
  `userid` int(8) NOT NULL COMMENT '用户账号',
  `inviter` int(8) NOT NULL COMMENT '邀请人账号',
  `unread` int(255) NOT NULL DEFAULT '0' COMMENT '未读消息',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`homeid`,`userid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of group_user
-- ----------------------------
BEGIN;
INSERT INTO `group_user` VALUES (1000000001, 10000002, 10000001, 1, '2020-03-29 21:52:59');
INSERT INTO `group_user` VALUES (1000000001, 10000003, 10000001, 20, '2020-03-29 21:52:59');
INSERT INTO `group_user` VALUES (1000000007, 10000001, 10000001, 0, '2020-03-29 23:15:06');
INSERT INTO `group_user` VALUES (1000000007, 10000002, 10000001, 0, '2020-03-29 23:14:50');
INSERT INTO `group_user` VALUES (1000000007, 10000003, 10000001, 1, '2020-03-29 23:09:33');
INSERT INTO `group_user` VALUES (1000000008, 10000001, 10000001, 0, '2020-03-29 21:50:37');
INSERT INTO `group_user` VALUES (1000000008, 10000002, 10000001, 0, '2020-03-29 21:47:54');
INSERT INTO `group_user` VALUES (1000000008, 10000003, 10000001, 10, '2020-03-29 21:50:18');
INSERT INTO `group_user` VALUES (1000000009, 10000001, 10000001, 0, '2020-03-29 21:30:05');
INSERT INTO `group_user` VALUES (1000000009, 10000002, 10000001, 1, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000003, 10000001, 15, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000004, 10000001, 15, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000005, 10000001, 15, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000006, 10000001, 15, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000007, 10000001, 15, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000008, 10000001, 15, '2020-03-29 23:24:13');
INSERT INTO `group_user` VALUES (1000000009, 10000009, 10000001, 15, '2020-03-29 23:24:13');
COMMIT;

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `tagid` int(10) NOT NULL COMMENT '标签自增流水号',
  `tag` varchar(10) NOT NULL COMMENT '标签名称',
  `userid` int(8) NOT NULL COMMENT '用户账号',
  PRIMARY KEY (`tagid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tag
-- ----------------------------
BEGIN;
INSERT INTO `tag` VALUES (1000000002, '家人', 10000001);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userid` int(8) NOT NULL COMMENT '用户账号',
  `password` varchar(6) NOT NULL COMMENT '用户密码',
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `updatetime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (10000001, '123456', '2020-03-22 19:24:59', NULL);
INSERT INTO `user` VALUES (10000002, '123456', '2020-03-22 19:25:28', NULL);
INSERT INTO `user` VALUES (10000003, '123456', '2020-03-28 00:32:03', NULL);
INSERT INTO `user` VALUES (10000004, '123456', '2020-03-28 00:32:28', NULL);
INSERT INTO `user` VALUES (10000005, '123456', '2020-03-29 15:55:48', NULL);
INSERT INTO `user` VALUES (10000006, '123456', '2020-03-29 15:56:01', NULL);
INSERT INTO `user` VALUES (10000007, '123456', '2020-03-29 15:56:18', NULL);
INSERT INTO `user` VALUES (10000008, '123456', '2020-03-29 15:56:30', NULL);
INSERT INTO `user` VALUES (10000009, '123456', '2020-03-29 15:56:44', NULL);
COMMIT;

-- ----------------------------
-- Table structure for user_friend
-- ----------------------------
DROP TABLE IF EXISTS `user_friend`;
CREATE TABLE `user_friend` (
  `userid` int(8) NOT NULL COMMENT '用户账号',
  `friendid` int(8) NOT NULL COMMENT '好友账号',
  `chatid` int(10) NOT NULL COMMENT '单聊房号',
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`userid`,`friendid`,`chatid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_friend
-- ----------------------------
BEGIN;
INSERT INTO `user_friend` VALUES (10000001, 10000002, 1000000004, '2020-03-28 00:23:47');
INSERT INTO `user_friend` VALUES (10000001, 10000003, 1000000005, '2020-03-28 00:34:33');
INSERT INTO `user_friend` VALUES (10000002, 10000001, 1000000004, '2020-03-28 00:23:47');
INSERT INTO `user_friend` VALUES (10000003, 10000001, 1000000005, '2020-03-28 00:34:33');
COMMIT;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `userid` int(8) NOT NULL COMMENT '用户账号\n用户账号',
  `nickname` varchar(10) NOT NULL COMMENT '用户昵称',
  `img` varchar(255) DEFAULT NULL COMMENT '用户头像URL',
  `sex` int(1) DEFAULT '0' COMMENT '性别：0-不详；1-男；2-女；',
  `age` int(3) DEFAULT '0' COMMENT '年龄',
  `signature` varchar(50) DEFAULT NULL COMMENT '个性签名',
  `createtime` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `updatetime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------
BEGIN;
INSERT INTO `user_info` VALUES (10000001, 'JavonHuang', 'http://img2.imgtn.bdimg.com/it/u=959507130,2354916332&fm=11&gp=0.jpg', 1, 1, '测试组成', '2020-03-22 19:24:59', '2020-03-22 19:36:33');
INSERT INTO `user_info` VALUES (10000002, 'Javon', 'http://pic1.zhimg.com/v2-823ed707923542746602f489a1527a81_fhd.jpg', 1, 1, '12', '2020-03-22 19:25:28', '2020-03-22 23:03:35');
INSERT INTO `user_info` VALUES (10000003, 'Javon01', NULL, 2, 1, 'haha', '2020-03-28 00:32:03', NULL);
INSERT INTO `user_info` VALUES (10000004, 'Javon02', NULL, 2, 1, '54y', '2020-03-28 00:32:28', NULL);
INSERT INTO `user_info` VALUES (10000005, '黄', NULL, 2, 1, 'hah', '2020-03-29 15:55:48', NULL);
INSERT INTO `user_info` VALUES (10000006, 'yu', NULL, 1, 1, '123456', '2020-03-29 15:56:01', NULL);
INSERT INTO `user_info` VALUES (10000007, '1234', NULL, 1, 1, NULL, '2020-03-29 15:56:18', NULL);
INSERT INTO `user_info` VALUES (10000008, '34', NULL, 1, 1, NULL, '2020-03-29 15:56:30', NULL);
INSERT INTO `user_info` VALUES (10000009, '4334', NULL, 2, 1, '322', '2020-03-29 15:56:44', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
