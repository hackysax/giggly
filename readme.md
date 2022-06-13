# Application Working name: Giggly
### MERN application for bands tracking gigs

Development deployment is here:
https://gigglydevelopmentdeployment.herokuapp.com/

**Description**
Login as a user representing a band and add your gigs/shows with venue, contact email, dat eof show, genre, and show status. Simple functionality to begin as a proof of concept and my initial MERN application. In general AppContext is used to track global state in the react application. Styled components are used as component wrappers for most styling. This application was originally modeled from a MERN stack application and a tutorial by John Smigla.

**Future plans**
Basic framework and api is setup. Main tasks in the future include adding a [Venue] schema, an [Act] schema as well as user roles that allow those uses to create or join venue or acts. The [Gig] schema will be updated to track the many variables involved in setting up a live event. Each venue and act will any number of gig documents. Relationships between collections will be dicated by business logic intended to ease the booking process between live acts and live venues as well as help venues find available acts for dates and vice versa. 

**Key Dependencies (See package.json for complete list)**
1. Create react app
2. Axios
3. Express
4. MongoDB
5. Rechart (Note, React 18.x is not directly compatable with rechart. See package.json for scrip overrides)
6. Styled Components
7. bcrypt
8. jsonwebtoken

**Known Issues for this build**

1. ~~AuthController register function not passing message for password being too short.~~
3. ~~Location not passing through from New Gig form.~~
4. ~~Filter on status does not work.~~
5. Gigs overflowing out of container for certain screen sizes.
6. ~~Black text on landing page shoudl be light text~~
7. Search and filter interface should have a dark wrapper.
8. Search and filter field labels should be light text.
9. Pagination sould reduce to current page and pre/next butons on smaller screen.
10. ~~Fix issue with final month not showing up in metrics charts given certian conditions~~<----still an issue in development deployment but fixed in this repo 
