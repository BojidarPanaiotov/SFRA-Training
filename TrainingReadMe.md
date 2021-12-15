# Content Assets and Slots

1. ## Homepage  

    ### Hero Slider  
    Controller: NewHome  
    Route: Show  

    ### Content Slot for listing categories  
    Controller: NewHome  
    Route: ListCategories  

    ### Featured Products  
    Controller: NewHome  
    Route: Featured  

2. ## Category Landing Page  

    ### Category Content Slot  
    Content Slot Name: cat-landing-extra  
    Template: catLanding  

3. ## PDP  

    ### Content Asset Unique Product Information  
    Controller: Product  
    Content Asset Name: unique_product_information  
    Template: Code injected at 126 line  

4. ## Registration & order confirmation emails  

    ### Registration and Order Confirmation attach aditional information  
    Controllers: Account and CheckoutServices  
    Util Function: cartridge/scripts/utils/utilFunction.js  
    Templates: accountRegisteredEmail, confirmationEmail and suggestProductsEmail  
