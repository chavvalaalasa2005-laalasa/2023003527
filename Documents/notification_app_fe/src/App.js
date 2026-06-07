import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Box,
  Chip,
  Button,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

import { ACCESS_TOKEN, Log } from "./logger";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [type, setType] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const priorityOrder = {
    Placement: 3,
    Event: 2,
    Result: 1,
  };

  const getIcon = (type) => {
    if (type === "Placement") return <WorkIcon />;
    if (type === "Event") return <EventIcon />;
    return <SchoolIcon />;
  };

  const getColor = (type) => {
    if (type === "Placement") return "success";
    if (type === "Event") return "primary";
    return "warning";
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      let url = `/evaluation-service/notifications?limit=${limit}&page=${page}`;

      if (type) {
        url += `&notification_type=${type}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      const data = response.data.notifications || [];

      const sorted = [...data].sort((a, b) => {
        const priorityDiff = priorityOrder[b.Type] - priorityOrder[a.Type];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      setNotifications(sorted);
      Log("frontend", "info", "api", "Notifications fetched successfully");
    } catch (error) {
      console.error(error);
      setError("Unable to load notifications. Please check token or input values.");
      Log("frontend", "error", "api", "Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 45%, #ecfeff 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={4}
          sx={{
            p: { xs: 3, md: 5 },
            mb: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
            color: "white",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <NotificationsActiveIcon sx={{ fontSize: 48 }} />
            <Box>
              <Typography variant="h3" fontWeight="bold">
                Campus Notifications
              </Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Smart priority inbox for placements, events, and results
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
            Filters
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Notification Type</InputLabel>
                <Select
                  value={type}
                  label="Notification Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Placement">Placement</MenuItem>
                  <MenuItem value="Event">Event</MenuItem>
                  <MenuItem value="Result">Result</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Limit"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Page"
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ height: "56px", borderRadius: 2 }}
                onClick={fetchNotifications}
              >
                Fetch Notifications
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            Priority Inbox
          </Typography>
          <Typography color="text.secondary">
            Placement notifications are shown first, followed by events and results.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {notifications.map((item) => (
              <Grid item xs={12} md={6} key={item.ID}>
                <Card
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    transition: "0.3s",
                    borderLeft: "6px solid #2563eb",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Chip
                        icon={getIcon(item.Type)}
                        label={item.Type}
                        color={getColor(item.Type)}
                        sx={{ fontWeight: "bold" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Priority {priorityOrder[item.Type]}
                      </Typography>
                    </Box>

                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                      {item.Message}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {item.Timestamp}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && notifications.length === 0 && !error && (
          <Alert severity="info" sx={{ mt: 3 }}>
            No notifications found.
          </Alert>
        )}
      </Container>
    </Box>
  );
}

export default App;