# Schemas



### Profile
* Feeds
    data
        {someid: {name, users, type:COMMUNITY/USERS} }
    rank
        [someid, someid2]
* folders
    
### Post
```


```

### How messaging works

* implement messaging
    * Add collections
        * chatGroup
            * type (ONE_TO_ONE & ONE_TO_MANY)
            * id
            * adminID
        * chatGroupMessages
            * folderID (default: "GENERAL")
            * message
            * groupID
            * senderID
        * chatGroupMembers
            * memberID
            * groupID
    * Add a "messages" field in profile doc
        * For one to one
            * {groupID:{unreadMessages, lastMessage},  } 
        * for one to many
            * {groupID: {folderID: {unreadMessages, lastMessage}}}
    * Create a /mesaging page
    * create a component called create chat, it will render a list of all the people you follow
        * when you select that person create a ONE_TO_ONE chatGroup
    * create an api called postMessage
        * it will take groupID, folderID and message
        * after sending the message fetch list of all the members of that group
        * call an update many and 
            * increment userdoc.messages[groupID][folderID].unreadMessage 
            * update userdoc.messages[groupID][folderID].unreadMessage
            * but for one_to_one group folderID will not be required
    * render message for the selected group
    * create an api called getMessages
        * it will take groupID and folderID
    * create a websocket which will give you live message of the folder of chat group you have opened
    * add a field inside profile called lastActiveAt
    * if last active was more than 3 seconds only then increment unReadMessage


