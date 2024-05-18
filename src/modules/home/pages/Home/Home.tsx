import {
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <Box m={4} className={` ${styles.homeContainer} card`}>
      <Link
        variant="h1"
        gutterBottom
        href="https://github.com/yazanj082/AO-React-Task"
      >
        React Task V3
      </Link>

      <Box className={styles.section}>
        <Typography variant="h2" className={styles.heading}>
          Introduction
        </Typography>
        <Typography component={"span"}>
          Welcome to React Task V3! This project is a TypeScript Vite React
          application with a sidebar that opens different pages. In this Page,
          you'll find instructions on how to run the project and a description
          of its structure and functionalities. also this project is configured
          with git action for auto deployment on the link{" "}
          <Link href="https://white-pond-04a73d610.5.azurestaticapps.net">
            React Task V3
          </Link>
        </Typography>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h2" className={styles.heading}>
          Getting Started
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Clone this repository to your local machine."
              className={styles.listItemText}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Navigate to the project directory."
              className={styles.listItemText}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Install dependencies by running npm install or yarn install."
              className={styles.listItemText}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Start the development server with npm run dev or yarn dev."
              className={styles.listItemText}
            />
          </ListItem>
        </List>
      </Box>
      <Box className={styles.section}>
        <Typography variant="h2" className={styles.heading}>
          Testing
        </Typography>
        <Typography>
          Added only one simple test file for PeopleList
        </Typography>
      </Box>
      <Box className={styles.section}>
        <Typography variant="h2" className={styles.heading}>
          Features
        </Typography>

        <Box className={styles.section}>
          <Typography variant="h3" className={styles.heading}>
            Page 1: People List from Star Wars API
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Description"
                secondary="Displays a table with people from the Star Wars API."
                className={styles.listItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Attributes"
                secondary="Name, Gender, Height, Eye Color."
                className={styles.listItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Additional Functionality"
                secondary={
                  <Typography component="div">
                    <Box>
                      <Typography>1- Pagination</Typography>

                      <Typography>2- Search by:</Typography>
                      <List>
                        <ListItem className={`${styles.listBox}card`}>
                          <ListItemText primary="Name" />
                          <ListItemText primary="Gender" />
                          <ListItemText primary="Height" />
                          <ListItemText primary="Eye Color" />
                        </ListItem>
                      </List>

                      <Typography>
                        3- More details button to navigate to Page 2:
                      </Typography>
                    </Box>
                  </Typography>
                }
                className={styles.listItemText}
              />
            </ListItem>
          </List>
        </Box>

        <Box className={styles.section}>
          <Typography variant="h3" className={styles.heading}>
            Page 2: Add Workspace Form
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Description"
                secondary="Form for adding workspaces with validation and error messaging."
                className={styles.listItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fields"
                secondary={
                  <Typography component="div">
                    <List>
                      <ListItem>First Name (required).</ListItem>
                      <ListItem>Last Name (required).</ListItem>
                      <ListItem>Gender (required).</ListItem>
                      <ListItem>Date Of Birth (required).</ListItem>
                      <ListItem>Disorder (required).</ListItem>
                      <ListItem>Workspace (required).</ListItem>
                      <ListItem>
                        Additional workspace fields can be added dynamically.
                      </ListItem>
                    </List>
                  </Typography>
                }
                className={styles.listItemText}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Functionality"
                secondary={
                  <Typography component="div">
                    <List>
                      <ListItem>Validation and error messages.</ListItem>
                      <ListItem>
                        Display form data inside an alert on submit.
                      </ListItem>
                    </List>
                  </Typography>
                }
                className={styles.listItemText}
              />
            </ListItem>
          </List>
        </Box>
      </Box>

      <Box className={styles.section}>
        <Typography variant="h2" className={styles.heading}>
          Technologies Used
        </Typography>
        <Typography component="div">
          <List>
            <ListItem>React</ListItem>
            <ListItem>TypeScript</ListItem>
            <ListItem>Vite</ListItem>
            <ListItem>Vitest</ListItem>
            <ListItem>Material-UI</ListItem>
            <ListItem>React Router</ListItem>
            <ListItem>React Hook Form</ListItem>
          </List>
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
