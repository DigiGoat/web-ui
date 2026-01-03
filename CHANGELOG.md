## 7.0.5-beta.2
* Completed the change detection fix started in `7.0.3-beta.1`
  * The OG description is now also compared properly when detecting changes to a page  

## 7.0.5-beta.1
* Fixed a new bug instroduced in `7.0.3-beta.1` causing the deploy workflow to not notify IndexNow of changes

## 7.0.4-beta.1
* Fixed a bug causing goats to not be updated
  * This was due to the files containing the information to be cached by the browser

## 7.0.3-beta.1
* Rolled over current lactation fix from client-app
* Fixed a bug causing the deploy workflow to mark a page as having changes when it didn't
* Fixed a bug causing indexnow to fail if a goat's name contained `'`'s

## 7.0.2-beta.2
* Fixed a bug causing websites not to deploy when using firebase hosting

## 7.0.2-beta.1
* Updated the deploy script to use the cached sitemap if possible to prevent what happened in `7.0.0` from having a lasting impact in the future
* Blacklisted the 404 rewrite pages in the sitemap to prevent it from being indexed by search engines

## 7.0.1-beta.1
* Deleted and accidentally committed file that caused releases to publish to https://lilpilchuckcreek.org/

## 7.0.0-beta.3
* Blacklisted 404 rewrite pages in robot.txt
* Several behind-the-scenes improvements to the deploy process
  * Firebase now supports projects with id's different from the repository name
  * Added default url if hosting with firebase and no url is provided

## 7.0.0-beta.2
* Removed the use of the `PAGE_URL` variable in favor of only using the firebase config in `settings.json`
  * This simplifies the configuration process 

## 7.0.0-beta.1
* Parameters that only need to be edited by DigiGoat are now located in their own file
  * This means that when Digi has to do some work on your site, there won't be any conflicts with your work

## 6.0.16-beta.1
* Updated license

## 6.0.15-beta.1
* Continued SEO improvements
  * The page descriptions are now prefixed with "As of [current date], "
  * This will help identify outdated content in search results

## 6.0.14-beta.1
* Fixed a bug causing websites to fail to deploy when using firebase hosting

## 6.0.13-beta.2
* Even more SEO improvements
  * Page descriptions are now even more dynamically generated so that they stay between 120 and 160 characters
  * The change detection algorithm has been updated so that it now will detect changes to either this new description or the user-configured description

## 6.0.13-beta.1
* Significantly improved SEO
  * Pages now present and auto-generated summary descriptions IN ADDITION to any configured animal descriptions
  * This will significantly improve change detection as it is easier to compare old and new content now
  * Additionally, this will hopefully help present relevant information in search results since the users descriptions are intended to be seen in the context of the animal

## 6.0.12-beta.1
* Fixed a bug causing the build and test workflows to not run correctly on pull requests

## 6.0.11-beta.1
* Updated all the links and emails to use the new DigiGoat domain (`digigoat.app`)

## 6.0.10-beta.2
* Added some better logging to the deploy workflow to help identify which workflow it is running under (now that in can be "Deploy Website" or "Sync Website")

## 6.0.10-beta.1
* Fixed some bugs with the sync workflow
  * Fixed a bug causing it to download an outdated version of the website when deploying
  * Fixed a bug with the workflow not comparing against the correct last deploy if the last deploy was triggered by the sync workflow
  * Fixed a bug causing the the sync script to delete lactation data if CDCB is down

## 6.0.9-beta.1
* Fixed the webmanifest

## 6.0.8-beta.1
* Changed the background color of the body to the secondary color scheme.
  * This now matches the header and footer when scrolling beyond the viewport height.


## 6.0.7-beta.5
* Now that the sync workflow is successfully running, fixing the deploy workflow over-running from it

## 6.0.7-beta.4
* Fixed the bug with the sync workflow not deploying

## 6.0.7-beta.3
* Fixed a bigger bug implemented in `6.0.7-beta.2`

## 6.0.7-beta.2
* Still trying to fix that bug

## 6.0.7-beta.1
* Attempting to fix a bug that causes the sync workflow not to deploy

## 6.0.6-beta.1
* Fixed a bug causing firebase to block Microsoft Clarity from loading due to an incorrect Content Security Policy
* Fixed the default colors for light mode

## 6.0.5-beta.1
* Updated the deploy workflow so that if it is triggered by the sync workflow, it will only deploy if there were changes committed during the sync or during the build process
  * This prevents unnecessary deploys when there are no changes to the website

## 6.0.4-beta.1
* Updated bootstrap from `5.3.3` to `5.3.8`
  * This is a library used for fonts and styles

## 6.0.3-beta.2
* Fixed a bug causing the website not to deploy after a sync when using firebase

## 6.0.3-beta.1
* Improved website syncing
  * The deploy workflow will no longer auto-disable after 60 days of inactivity

## 6.0.2-beta.2
* Fixed a bug causing custom pages not to render if navigating from one to another (it was staying on the first page's content)

## 6.0.2-beta.1
* Some back-end improvements to custom pages

## 6.0.1-beta.1
* Fixed a bug causing the sync workflow not to run

## 6.0.0-beta.1
* Added custom pages!
  * These are pages that can be whatever you'd like them to be!

## 5.6.7-beta.1
* Improved how lists are displayed

## 5.6.6-beta.7
* bcc'd digigoat@lilpilchuckcreek.org on email notifications

## 5.6.6-beta.6
* Cleaned up some formatting for the email notifications

## 5.6.6-beta.5
* Fixed a bug causing the website not to deploy after syncing lactations

## 5.6.6-beta.4
* Fixed a bug causing emails not to be sent
* Fixed the urls to the updated goats in the emails

## 5.6.6-beta.3
* Fixed a bug with the email authentication for notifying lactation changes

## 5.6.6-beta.2
* Fixed a bug causing the website not to compile due to the nodemailer types

## 5.6.6-beta.1
* You now receive email notifications when lactation records are updated!

## 5.6.5-beta.2
* Fixed a bug causing the sync workflow to fail
  * It wasn't saving the updated lactation records

## 5.6.5-beta.1
* Reverted `5.6.1-beta.1` as it was causing issues with the sync workflow. The adga package is now automatically stripped of the beta tag during the release process again.

## 5.6.4-beta.4
* Modified how the sync workflow records if there are changes to remove some breaking errors

## 5.6.4-beta.3
* Added missing `|` that was preventing the commit step of the sync workflow from running

## 5.6.4-beta.2
* Updated the adga dependency to try to fix a sync error

## 5.6.4-beta.1
* Removed the beta strip from the adga dependency as it is a dev dependency and not used in production

## 5.6.3-beta.1
* Fixed a bug causing the sync workflow to fail
  * It was not running `yarn install`

## 5.6.2-beta.1
* The Firebase deploy comment now includes what triggered the run

## 5.6.1-beta.1
* Fixed a bug with how the adga package version was managed

## 5.6.0-beta.2
* Fixed a bug causing the sync workflow to not run on triggers other than the schedule

## 5.6.0-beta.1
* Lactation data is now updated automatically!
  * Your website will now check with the CDCB daily to see if there is new lactation data available
  * If there is new data, it will be automatically updated on your website

## 5.5.3-beta.1
* Fixed a major bug causing indexnow to not work properly

## 5.5.2-.beta.1
* Flipped the order of the age and the freshening of a goat on the does page

## 5.5.1-beta.2
* Applied this fix for images across the site

## 5.5.1-beta.1
* Fixed a bug causing images on the homepage to be wider than the screen on mobile devices

## 5.5.0-beta.3
* Fixed a bug causing the current lactation table to show up on goats that are not in milk

## 5.5.0-beta.2
* Significantly improved how lactation data is displayed on mobile devices
  * Consequently, fat and protein data is now hidden if lacking space

## 5.5.0-beta.1
* Added CDCB Support!
  * This allows you to see your milk test data for all of your does
  * Currently, all lactations from milk test are shown, as well as the individual tests and the performance of each lactation (Somatic cell count is not currently shown)
  * This is currently only available for does, but may be added for pedigrees in the future
* Goat cards now display how many freshenings a doe has

## 5.4.10-beta.4
* One last attempt to fix the headers bug (I'll probably give up on it after this)

## 5.4.10-beta.3
* Continued to work on the headers bug

## 5.4.10-beta.2
* Simplified how headers are matched (what I should have done in the first place)

## 5.4.10-beta.1
* Tweaked the header rules

## 5.4.9-beta.1
* Fixed a bug that would cause goat cards to be unclickable if they don't have a nickname

## 5.4.8-beta.1
* IndexNow API is now notified AFTER the deploy process is complete
  * This fixes faulty notices is the deploy fails

## 5.4.7-beta.5
* So I may have forgotten to actually pass in the token when I elevated it's permissions...

## 5.4.7-beta.4
* Fixed a bug when identifying the run number of the last successful deployment

## 5.4.7-beta.3
* Fixed a permissions bug causing the website to not deploy properly
* Better logging about which website artifact is being used

## 5.4.7-beta.2
* Fixed a bug causing the website to find the last artifact correctly if the previous run didn't have a website deployed

## 5.4.7-beta.1
* The deploy process now downloads your website from the previous run to reduce website quota usage

## 5.4.6-beta.2
* Modals now remove the `noindex` meta tag from "not found" modals if a cononical tag is possible

## 5.4.6-beta.1
* Added canonical tags to the goat modals to prevent duplicate content from being indexed by search engines

## 5.4.5-beta.1
* "Not Found" modals now set the `noindex` meta tag to prevent search engines from indexing the page

## 5.4.4-beta.1
* Added support for the `First Input Delay` metric in the performance report

## 5.4.3-beta.4
* The headers bug is finally fixed! 🎉 (THANK GOD - THAT WAS A PAIN)
* Updated the CSP header to allow microsoft clarity to work properly

## 5.4.3-beta.3
* Another attempt to fix the headers bug for the base of the website

## 5.4.3-beta.2
* Updated the headers matcher to catch the base of the website

## 5.4.3-beta.1
* Bumped node version from `20.11.1` to `20.19.2` to fix a bug when deploying the website

## 5.4.2-beta.5
* Put the finishing touches on fixing the headers bug

## 5.4.2-beta.4
* Attempt 2 at fixing the headers bug

## 5.4.2-beta.3
* Fixed an analytics bug when using the firebase sdk
* Attempted to fix a bug causing headers not to be applied properly for the html files

## 5.4.2-beta.2
* Filled in missing config params during the deploy process for the firebase sdk

## 5.4.2-beta.1
* Added firebase sdk support (this is the first update that actually recommends an app update)

## 5.4.1-beta.1
* Fixed a bug causing reference goats to not be rendered & routed
* Added 404 goat pages for a better user experience
* Fixed a logging bug during the deploy process
* Added timeout to the build during the deploy process to prevent it from hanging

## 5.4.0-beta.19
* Fixed a bug introduced by the deploy optimizations in `5.4.0-beta.18` causing the website to not deploy properly

## 5.4.0-beta.18
* Updated the automated deploy to only run if the website was not already deployed in the last 24 hours
* Slightly optimized the deploy process to be faster

## 5.4.0-beta.17
* When running the automated deploy, the time zone is now set to PST when calculating the age of the goats.

## 5.4.0-beta.16
* Better logging for the deploy process

## 5.4.0-beta.15
* The deploy process now only deploys the website if there are changes to the website (only if triggered by the once-a-day schedule, pushes still always deploy)

## 5.4.0-beta.14
* Further improved resource caching to reduce loading times

## 5.4.0-beta.13
* Fixed a typo in the deploy script causing the website to not deploy

## 5.4.0-beta.12
* Fixed a bug introduced in `5.4.0-beta.9` causing the website to not deploy properly to firebase

## 5.4.0-beta.11
* Fixed a bug introduced in `5.4.0-beta.9` causing the website to not deploy properly to github pages

## 5.4.0-beta.10
* Added missing node version to the deploy script

## 5.4.0-beta.9
* Added headers to increase security and optimize the website

## 5.4.0-beta.8
* Some optimizations to the deploy process

## 5.4.0-beta.7
* Fixed a bug when installing the firebase cli while deploying the website

## 5.4.0-beta.6
* Updated the firebase deploy comment to be more descriptive
* Revived node 18 support

## 5.4.0-beta.5
* Optimized the deploy process to be faster

## 5.4.0-beta.4
* Fixed a bug in when deploying website updates

## 5.4.0-beta.3
* Killed node 18 support

## 5.4.0-beta.2
* Fixed a bug causing the firebase cli to not be installed properly (or at all)

## 5.4.0-beta.1
* Added support for firebase hosting
  * SDK implementation is not complete yet, but the hosting should work

## 5.3.5-beta.1
* Updated the age displayed on the goat's page to show the age in weeks until the goat is at least 15 weeks old (it was originally 5 weeks)

## 5.3.4-beta.2
* Fixed a bug causing the markdown for goats to be re-rendered when the goat is opened

## 5.3.4-beta.1
* Added support for Markdown rendering in the live preview! This even works offline!

## 5.3.3-beta.1
* Nicknames with spaces now use dashes for the url

## 5.3.2-beta.1
* SEO Improvements
  * The website is now compiled once a day in addition to on changes to ensure ages stay up-to-date
  * Fixed a bug causing spaces to be removed from the goat's name in the page title

## 5.3.1-beta.1
* Fixed a bug causing the goats on the for sale page to not be rendered properly
* Fixed a bug causing the goats on the for sale page to not show up in search results

## 5.3.0-beta.1
* Added when a goat passed away (if applicable)

## 5.2.0-beta.3
* Fixed a bug causing the count of awards to be displayed improperly

## 5.2.0-beta.2
* Fixed a bug causing the awards to not display for the Dam's Dam in the pedigree

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
