* Subpage feature in article editor
    * create a new node for subpage
    * block subArticle inside feed and profile
    * Don't add privacy feature, it is a rare case


* Problems
    * publishing a main article will not publish nested sub articles
        * Either keep track of all the subarticles
        * Or store all subArticles inside the sameDoc with different _id


* Goal
    * Allow course like articles


* Method 1 -> Store subArticles in same docs
    * pros
        * Privacy feature
        * All linked pages can be published in one go
    * cons
        * Articles can't be searched indivisually
        * Will have to Emulate subArticle as Real articles
* Method 2 -> Create a real article and block subArticle 
    * pros
        * No need of emulation
    * cons
        * Tracking all the subArticles will be really hard
        * Privacy feature will be impossible


* Method 2 is better because search is a very important feature

    

