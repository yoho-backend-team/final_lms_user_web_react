import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Icon from "components/icon";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "components/mui/chip";

const TicketViewPage = () => {
  return (
    <Box sx={{ m: 5 }}>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Grid
          item
          md={1}
          xs={12}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Icon icon="material-symbols:arrow-back" />
          <Typography variant="h3" sx={{ ml: 2 }}>
            Ticket
          </Typography>
        </Grid>
        <Grid
          item
          md={11}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Ticket ID : Ticket #123454566774</Typography>
          <Button variant="contained" size="medium" color="success">
            Request For Close
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ my: 4 }}>
        <Card>
          <CardContent>
            <Box>
              <Grid container spacing={2} sx={{ alignItems: "center" }}>
                <Grid item md={5} xs={12}>
                  <Typography variant="h4">
                    #7 An error occurred while attempting to log into the app
                  </Typography>
                </Grid>
                <Grid item md={2} xs={6}>
                  <Typography>Show activates</Typography>
                </Grid>
                <Grid item md={2} xs={6}>
                  <Chip label="Close ticket" />
                </Grid>
                <Grid
                  item
                  md={3}
                  xs={12}
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  <Box sx={{ display: "flex" }}>
                    <Typography>Raised Date & time : </Typography>
                    <Typography sx={{ color: "text.primary" }}>
                      March 20,03:00pm
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ my: 2 }}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Card>
                    <CardContent>
                      <Box sx={{ mt: 2 }}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid
                              container
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid item>
                                <Typography variant="h4">
                                  Oliver Smith
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">
                                  Monday May,2023 3:00 PM, 9 days ago
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="body2">
                              As a CSS utility component, the Typography
                              component supports all system properties. You can
                              use them as prop directly on the component. For
                              example, here's how you'd add a margin-top
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box
                        sx={{
                          mt: 4,
                          backgroundColor: "#757575",
                          p: 2,
                          borderRadius: "15px",
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid
                              container
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid item>
                                <Typography variant="h4">
                                  Esther Howard
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">
                                  Monday May,2023 3:00 PM, 9 days ago
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="body2">
                              See the documentation below for a complete
                              reference to all of the props and classes
                              available to the components mentioned here.
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ mt: 4 }}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid
                              container
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Grid item>
                                <Typography variant="h4">
                                  Esther Howard
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography variant="body1">
                                  Monday May,2023 3:00 PM, 9 days ago
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 2 }}>
                            <Typography variant="body2">
                              As a CSS utility component, the Typography
                              component supports all system properties. You can
                              use them as prop directly on the component. For
                              example, here's how you'd add a margin-top
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button variant="outlined" color="error">
                              Solved
                            </Button>
                            <Button
                              sx={{ ml: 2 }}
                              variant="contained"
                              color="primary"
                            >
                              No Related
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item md={6} xs={12} sx={{ mt: 2 }}>
                  <Box>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h4">
                              issue Description
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Sometimes you might want to have icons for certain
                          buttons to enhance the UX of the application as we
                          recognize logos more easily than plain text.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h4">issue Category</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="body2">Attendance</Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h4">Attachments</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          01 Screenshot.PDF View
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box sx={{ mt: 3 }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h4">Status</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Chip label="Opened" color="success" />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Grid item>
                            <Typography variant="h4">Attempt</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography variant="body2">01</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TicketViewPage;
