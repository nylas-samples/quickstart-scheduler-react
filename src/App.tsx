import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NylasSchedulerEditor, NylasScheduling } from "@nylas/react";
import "./App.css";

function App() {
  // Get the configuration ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const configId = urlParams.get("config_id") || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <a href="/scheduler-editor" className="button">View Scheduler Editor</a>
            <NylasScheduling
              configurationId={configId}
              schedulerApiUrl="https://api.us.nylas.com"
            />
          </div>
        } />
        <Route path="/scheduler-editor" element={
          <div>
            <NylasSchedulerEditor
              schedulerPreviewLink={`${window.location.origin}/?config_id={config.id}`}
              nylasSessionsConfig={{
                clientId: "NYLAS_CLIENT_ID", // Replace with your Nylas client ID from the previous
                redirectUri: `${window.location.origin}/scheduler-editor`,
                domain: "https://api.us.nylas.com/v3", // or 'https://api.eu.nylas.com/v3' for EU data center
                hosted: true,
                accessType: 'offline',
              }}
              defaultSchedulerConfigState={{
                  selectedConfiguration: {
                    requires_session_auth: false, // creates public configuration which does not require session tokens
                    scheduler: { // callback URLs to be set in email confirmation messages
                      rescheduling_url:`${window.location.origin}/reschedule/:booking_ref`,
                      cancellation_url:`${window.location.origin}/cancel/:booking_ref`
                    }
                  }
              }}
            />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
export default App;   