## 2.1.5-beta.3
* Attempting to fic a bug causing the release pipeline to fail

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
