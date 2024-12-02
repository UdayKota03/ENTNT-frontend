import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminCommunication = () => {
  const [companie, setCompanie] = useState([]);
  const [addcommunication, setAddCommunication] = useState(false);
  const [communicationDetails, setCommunicationDetails] = useState({
    id: "",
    name: "",
    mandatoryFlag: "false",
  });

  const defaultCommunicationDetails = {
    id: "",
    name: "",
    mandatoryFlag: "false",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunicationDetails({
      ...communicationDetails,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (communicationDetails.name.trim() === "") {
      alert("Name is required.");
      return;
    }

    if (communicationDetails.id) {
      // Update existing communication
      setCompanie((prev) =>
        prev.map((item) =>
          item.id === communicationDetails.id ? communicationDetails : item
        )
      );
    } else {
      // Add new communication
      setCompanie((prev) => [
        ...prev,
        { ...communicationDetails, id: Date.now().toString() },
      ]);
    }
    setCommunicationDetails(defaultCommunicationDetails);
    setAddCommunication(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this communication?")) {
      setCompanie((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (communication) => {
    setCommunicationDetails(communication);
    setAddCommunication(true);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Admin Communications</h1>
        <Button onClick={() => setAddCommunication(true)}>
          Add Communication
        </Button>
      </header>

      <main>
        {companie.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No communications found. Click "Add Communication" to get started.
          </div>
        ) : (
          <ul className="space-y-4">
            {companie.map((communication) => (
              <li
                key={communication.id}
                className="flex justify-between items-center border rounded p-4"
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {communication.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Mandatory: {communication.mandatoryFlag === "true" ? "Yes" : "No"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEdit(communication)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(communication.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {addcommunication && (
          <div className="mt-8 border rounded p-4">
            <h2 className="text-lg font-bold mb-4">
              {communicationDetails.id ? "Edit Communication" : "Add Communication"}
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 font-medium">
                  Communication Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={communicationDetails.name}
                  onChange={handleChange}
                  placeholder="Enter communication name"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Mandatory Flag</label>
                <div className="flex space-x-4">
                  <label htmlFor="mandatoryFlagTrue" className="flex items-center">
                    <input
                      id="mandatoryFlagTrue"
                      type="radio"
                      name="mandatoryFlag"
                      value="true"
                      checked={communicationDetails.mandatoryFlag === "true"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">True</span>
                  </label>

                  <label htmlFor="mandatoryFlagFalse" className="flex items-center">
                    <input
                      id="mandatoryFlagFalse"
                      type="radio"
                      name="mandatoryFlag"
                      value="false"
                      checked={communicationDetails.mandatoryFlag === "false"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">False</span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="mt-4">
                Save Communication
              </Button>
            </form>

            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setAddCommunication(false);
                setCommunicationDetails(defaultCommunicationDetails);
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminCommunication;