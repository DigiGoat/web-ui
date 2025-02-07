## 5.2.0-beta.1
* Added support for Awards!

## 5.1.0-beta.1
* Simplified the farm names required to be configured. Instead of a menubar, home, and tab name, there is now just a full name and a short name

## 5.0.0-beta.5
* Added the Sale Terms and Pricing to the Kidding Schedule page in addition to the For Sale page

## 5.0.0-beta.4
* Added a page description for the For Sale page

## 5.0.0-beta.3
* Goats for sale now defualt to female if no gender is specified
* Loosened up algorithim for matching dams, sires, and goats for sale
* Added prices to the goats for sale
* Added a sale terms popup to the for sale page

## 5.0.0-beta.2
* Changed the format for how goats for sale are stored

## 5.0.0-beta.1
* Added support for a For Sale page
  * TODO: Add a designated price section and sale terms popup

## 4.1.3-beta.1
* Added the ability to customize the text at the top of the kidding schedule

## 4.1.2-beta.2
* Fixed a bug causing updates not to be posted as releases

## 4.1.2-beta.1
* A lot of behind-the-scenes changes to improve the performance of the site
  * Updated Angular from v17 to v19
  * Updated Typescript
  * Preparing to update Node.js

## 4.1.0-beta.1
* The kidding schedule now acceses reference goats when identifying dams and sires
  * This currently works even if you have disabled the references page on your site, that behavior may change in the future

## 4.0.0-beta.1
* Added Support for references!
  * This is intended for animals that are not in the herd but are related to the herd (animals you have on lease, deceased animals that still have a genetic impact on your herd, etc.)

## 3.2.1-beta.1
* Updated the links to use the new Favicons
  * NOTE: You will have to redo your favicons

## 3.2.0-beta.2
* Fixed a bug causing the LA table headers to be messed up on mobile

## 3.2.0-beta.1
* Added Support For Linear Appraisals!
  * Does & Bucks pages now show the LA history
  * Pedigrees now show LA scores

## 3.1.0-beta.3
* Added Tooltips to the socials

## 3.1.0-beta.2
* Added a slight margin between the socials and the homepage content

## 3.1.0-beta.1
* Added support for socials!
  * This currently includes [Facebook](https://facebook.com), [Instagram](https://instagram.com), and [Threads](https://threads.net)

## 3.0.7-beta.1
* Condensed the descriptions showed for the does and bucks pages in search results

## 3.0.6-beta.1
* Fixed a bug that could potentially cause the descriptions for the pages to not show up when posted on social media

## 3.0.5-beta.2
* Fixed the sitemap link in `robots.txt`

## 3.0.5-beta.1
* Added images to the sitemap

## 3.0.4-beta.5
* Fixed a bug causing the IndexNow API to not work

## 3.0.4-beta.4
* Fixed a bug when submitting pages to IndexNow

## 3.0.4-beta.3
* Added more logging to help identify IndexNow bug

## 3.0.4-beta.2
* Fixed a bug causing the site to think every page was deleted

## 3.0.4-beta.1
* Added support for the IndexNow API!
  * This will allow for quicker recognition of changes to the site

## 3.0.3-beta.4
* Decreased logging while checking for page changes

## 3.0.3-beta.3
* Increased the precision of the Last Modified Date in the sitemap

## 3.0.3-beta.2
* Fixed a bug causing the sitemap to not be generated for pages not on the old sitemap

## 3.0.3-beta.1
* Attempting to implement a more advanced sitemap, allowing for quicker indexing

## 3.0.2-beta.3
* Fixed a bug causing the default description on the homepage to not be seen by more advanced web crawlers

## 3.0.2-beta.2
* Added default descriptions for the goats if they do not have one

## 3.0.2-beta.1
* Several SEO improvements
  * Properly implemented `2.1.1-beta.2` - when sharing the does/bucks page, the images will be included
  * Added a description for the does & bucks pages
  * Added a description for the kidding schedule

## 3.0.1-beta.1
* Fixed a bug causing the page descriptions to contain HTML
* Fixed a bug causing the homepage to duplicate the homepage description
* Added a default description for the homepage

## 3.0.0-beta.4
* Fixed the kidding schedule's loading animation

## 3.0.0-beta.3
* Fixed a bug causing the Kidding Schedule to not display dates if they are invalid

## 3.0.0-beta.2
* Removed the `Bred` and `Due` columns from the Kidding Schedule if there is nothing to display
* Fixed a bug when the sire is not specified

## 3.0.0-beta.1
* Added a Kidding Schedule page!

## 2.1.5-beta.7
* Fixed the releases not associating with the correct commit

## 2.1.5-beta.6
* Fixed a bug causing the fix-version script not to fail

## 2.1.5-beta.5
* Fixed a bug causing the fix-version script not to run

## 2.1.5-beta.4
* Fixed a bug with the release titles

## 2.1.5-beta.3
* Attempting to fix a bug causing the release pipeline to fail

## 2.1.5-beta.2
* Added missing scripts to the `package.json`

## 2.1.5-beta.1
* Updated the release pipeline to speed up the update process

## 2.1.4-beta.1
* Addressed a deprecation logged by Edge Dev Tools

## 2.1.3-beta.1
* Improved route matching for displaying goats
* Spaces in names are now replaced with `-` in the URL (e.g. `Digi Goat` becomes `Digi-Goat`). This is to improve SEO and make the URL more readable

## 2.1.2-beta.4
* Increased the resolution of the logo on the home screen

## 2.1.2-beta.3
* Fixed a bug causing bucks to show up on the does page

## 2.1.2-beta.2
* Added an authentication token when rendering markdown to increase api rate limit

## 2.1.2-beta.1
* Added Support For Markdown!

## 2.1.1-beta.3
* Reverted images appearing for does/bucks pages as they broke the images when a specific goat is open

## 2.1.1-beta.2
* Fixed a potential bug causing the goat's description to not appear on Facebook
* When sharing your does/bucks page, the images will be included

## 2.1.1-beta.1
* Fixed the border that would appear around a goat's images in the modal

# 2.1.0
* Added the current owner of a goat to the pedigree

## 2.1.0-beta.1
* Added the current owner to pedigrees!

# 2.0.1
* Added Popovers To Pedigrees!

## 2.0.1-beta.2
* Fixed the color of links being hovered over in light mode

## 2.0.1-beta.1
* Added Popovers To Pedigrees!
  * They currently only show the dateOfBirth and id (owner and other info coming soon (LA scores, milk test, etc.))
* Fixed the color of links in light mode
* Increased the contrast when displaying the tattoo location

# 2.0.0
* Added Pedigrees!

## 2.0.0-beta.1
* Added A Pedigree On Each Does Page
  * This will utilize `related` goats and find the ones that match
# 1.0.1
* First fully stable version!

## 1.0.1-beta.23
* Placeholder affects properly display on images while loading goats
* Goat details (id, date of birth, etc.) now appear with more contrast (they are much easier to read in light mode now)
* Better detection for goat's images

## 1.0.1-beta.22
* Made the bootstrap bundle cachable and high priority

## 1.0.1-beta.21
* Added a shortcut for the homepage

## 1.0.1-beta.20
* Fixed the icons array being collapsed in the webmanifest

## 1.0.1-beta.19
* (hopefully) fixed the icon links in the webmanifest
* Added the default theme and background colors to the webmanifest

## 1.0.1-beta.18
* Fixed webmanifest shortcuts being improperly formatted

## 1.0.1-beta.17
* Fixed some paths in the deploy script

## 1.0.1-beta.16
* Added webmanifest
* Added Browser Config

## 1.0.1-beta.15
* Now when you add the site to you home screen on IOS, the title will be correct

## 1.0.1-beta.14
* Added support for custom color-schemes
* This also includes support for images as the background (by request only for security reasons)

## 1.0.1-beta.13
* Fixed link errors caused by non-base domains

## 1.0.1-beta.12
* Fixed link errors resulting from the configured link not ending with a `/`

## 1.0.1-beta.11
* Fixed OpenGraph Tags (Used for titles, links, and images on Facebook and IOS)

## 1.0.1-beta.10
* Improved analytic scripts to be appended to the head of the document

## 1.0.1-beta.9
* Fixed a bug causing the color scheme to be incorrectly reported to analytics

## 1.0.1-beta.8
* Added full support for Microsoft Clarity and Google Analytics
* Removed source code message from footer

## 1.0.1-beta.7
* Added additional 500ms delay before checking if the placeholder effect should be added

## 1.0.1-beta.6
* Images no longer appear to "flicker" when opening and closing a goat 🎉

## 1.0.1-beta.5
* Tweaked the script for handling the pages deployment
* Fixed a bug causing files to fail to load if the website address was not at the base of the domain

## 1.0.1-beta.4
* Fixed a bug causing the page to be improperly uploaded during the deployment

## 1.0.1-beta.3
* Fixed bug causing the page not to deploy automatically

## 1.0.1-beta.2
* Trying to fix commit history for future pull requests

## 1.0.1-beta.1
* Fixed `GH_TOKEN` not being injected into the `check_pages` step of the deploy workflow

# 1.0.0
### The initial implementation of the DigiGoat web-ui
