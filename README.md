# How to login

    * Call promptLogin function provided in the context
# How to get userdata

    * You can either use loggedInUser varialbe in the context or make an api call using SWR or serverLine

    ```
          const loggedInUser = useSWR("/api/v1/logged-in-user", serverLine.get);
    ```

    
    ```
          const loggedInUser = await serverLine.get("/api/v1/logged-in-user");
    ```

# How to make api call to the server

    * use serverLine library

    ```
        serverLine.get(url)
        serverLine.delete(url)
        serverLine.patch(url, bodyObject
        serverLine.post(url, bodyObject)
    ```

# How to show Alert

    * There is a variable inside of context called popupAlert 
    * Just pass message to it 

# How to upload Image

    ```
        let selectedFile;

        try {
            selectedFile = await selectFileAndCheck();
        } catch (e) {
            console.log(e);
            return;
        }

        setForm({ loading: true });

        try {
            let fileData = await compressAndUploadFile(
            theFileWeWillBeReplacing,
            selectedFile
            );
            return fileData.name;
        } catch (e) {
            setForm(null);
            popupAlert(e.message);
        }


    ```
# How to do routing

    * There are two methods
        * Link Tag
        * router object
            * the context object has a router object 

            ```
                router.push(newPath);
            ```  

# How to read url query

```
  const router = useRouter();

  useEffect(() => {
    if (router.isReady){
    const { fieldName } = router.query;
    }
  }, [router.query]);
```

* You can also import router from context

# How to use Dynamic Form

    * first import setForm from context

    * To Show loading screen
        ```
            setForm({loading:true})
        ```
    * To Show a react component
        ```
            setForm({component:theComponent})
        ```
    * To Show a proper form
        * options are used for menu style buttons
        * informativeButtons hold description as well as image

        ```
            setForm({
                title: "Some Title",
                buttons:[{icon:"", name:"", onClick:"" }], 
                inputs:[{name:"", placeholder:"" }], 
                options:[{icon:"", name:"", onClick:"" }], 
                informativeButtons:[{icon:"", name:"", onClick:"", info:"", image:"" }] })
        ```
# Env file format

```
NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID = 
GOOGLE_OAUTH_SECRET = 
NEXT_PUBLIC_PRODUCTION = NO


NEXT_PUBLIC_USER_JWT_COOKIE_NAME = user-jwt
NEXT_PUBLIC_USER_ID_COOKIE_NAME = user-id
NEXT_PUBLIC_COOKIE_EXPIRY_IN_DAYS = 30000
NEXT_PUBLIC_LOCALSTORAGE_NAME = user-localstorage


JWT_SECRET = 
DATABASE_LINK = 


CLOUDSTORAGE_PROJECT_ID = 
CLOUDSTORAGE_PRIVATE_KEY = 
CLOUDSTORAGE_CLIENT_EMAIL = 
```

