import { Grid, Skeleton, Stack } from "@mui/material";

export const LayoutLoader = () => {
  return (
    <Grid container style={{ height: "100vh", padding: "1rem" }} spacing={2}>
      <Grid
        item
        md={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            height: "calc(100vh - 4rem)",
          }}
        >
          <div style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
            <Skeleton variant="rectangular" height={"100%"} />
          </div>
        </div>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        style={{
          backgroundColor: "#ffffff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          height: "calc(100vh - 4rem)",
        }}
      >
        <Stack spacing={2}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={"100ch"} />
          ))}
        </Stack>

        <Skeleton variant="rectangular" height={"100%"} />
      </Grid>

      <Grid
        item
        md={3}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f0f0",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            height: "calc(100vh - 4rem)",
          }}
        >
          <div style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
            <Skeleton variant="rectangular" height={"100%"} />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};


