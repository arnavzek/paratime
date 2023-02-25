# Schemas

### Media Schema
```
{
    type:{
        type:String, 
        enum:["IMAGE","VIDEO"]
    },
    data:{
        IMAGE:{
            type:{
                type:String,
                enum:["USER_UPLOAD","UNSPLASH"]
            },
            data:String,
            colors:{
                prominantColor:String,
                dominantColor:String,
            }
        },VIDEO:{
            type:{
                type:String,
                enum:["EMBED","USER_UPLOAD"]
            },
            data:String,
            colors:{
                prominantColor:String,
                dominantColor:String,
            }
        }
    }
}

```


### Image Schema
```
{
    type:{
        type: String,
        enum: ["USER_UPLOAD","UNSPLASH"]
    },
    data:String,
    colors:{
        prominantColor:String,
        dominantColor:String,
    }
}

```

### Video Schema
```
{
    type:{
        type: String,
        enum: ["USER_UPLOAD","EMBED"]
    },
    data:String,
    colors:{
        prominantColor:String,
        dominantColor:String,
    }
}

```

### World Color Schema
```
{
    type:{
        type:String,
        enum:["CUSTOM","CONTENT"]
    },
    data:{
        CUSTOM:{
            promiantColor:String,
            dominantColor:String,
        },CONTENT:{
            source:{
                type:String,
                enum:["PROFILE_IMAGE","MEDIA","BACKGROUND","AUTO"]
            },
            inverted: true,
        }
    }
}

```



### Element Color Schema
```
{
    type:{
        type:String,
        enum:["CUSTOM","CONTENT"]
    },
    data:{
        CUSTOM:{
            promiantColor:String,
            dominantColor:String,
        },CONTENT:{
            source:{
                type:String,
                enum:["MEDIA","AUTO"]
            },
            inverted: true,
        }
    }
}

```


### Button Schema
```
{
    type:{
        type:String,
        enum:["URL","PAGE","DISABLED]
    },
    name:String,
    data:{
        URL:String,
        PAGE:String
    }
}

```

