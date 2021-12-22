# Content Assets and Slots

## 1. Homepage  

### Hero Slider  
    Controller: NewHome  
    Route: Show  

### Content Slot for listing categories  
    Controller: NewHome  
    Route: ListCategories  

### Featured Products  
    Controller: NewHome  
    Route: Featured  

## 2. Category Landing Page  

### Category Content Slot  
    Content Slot Name: cat-landing-extra  
    Template: catLanding  

## 3. PDP  

### Content Asset Unique Product Information  
    Controller: Product  
    Content Asset Name: unique_product_information  
    Template: Code injected at 126 line  

## 4. Registration & order confirmation emails  

### Registration and Order Confirmation attach aditional information  
    Controllers: Account and CheckoutServices  
    Util Function: cartridge/scripts/utils/utilFunction.js  
    Templates: accountRegisteredEmail, confirmationEmail and suggestProductsEmail  

# Page Designer

## 1. Extending Home Page  

### Information
    Controller: Home
    Page Designer page names: homepage and homepageCustom
    Site Preferences Group Name: pageDesignerHomepage (with enum string homepage/customHomepage)
    Files: homepage.json, homepage.js and the template homepage.isml 

## 2. Custom Hero Component  

### Information
    Files: customHero.json, customHero.js and the template customHero.isml

## 3. Custom Layout Component

### Information
    Files: responsiveMobileDesktopGrid.json, responsiveMobileDesktopGrid.js and the template mobileResponsiveGrid.isml
    
## 3. Custom Category Component

### Information
    Files: customCategory.json, customCategory.js and the template customCategory.isml

## 4. Custom Carousel Component

### Information
    Files: customCarousel.json, customCarousel.js and the template customCarousel.isml

# Forms

## 1. Bussines/Private Address Form  

### Information  
    Controller: Address (in the base cartridge)
    Templates: addressForm.isml and editAddAddress.isml
    Form Definition: address.xml
    Front End JS: addressBooks.js and addressFormSubmission.js