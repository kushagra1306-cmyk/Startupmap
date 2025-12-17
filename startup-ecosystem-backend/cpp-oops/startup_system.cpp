
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <ctime>

using namespace std;

// ==================== Base Classes ====================

class Entity {
protected:
    int id;
    time_t createdAt;
    
public:
    Entity(int id) : id(id) {
        createdAt = time(nullptr);
    }
    
    virtual ~Entity() {}
    
    int getId() const { return id; }
    time_t getCreatedAt() const { return createdAt; }
    
    virtual void display() const = 0; // Pure virtual function
};

// ==================== User Class ====================

class User : public Entity {
private:
    string name;
    string email;
    string passwordHash;
    
public:
    User(int id, string name, string email, string passwordHash)
        : Entity(id), name(name), email(email), passwordHash(passwordHash) {}
    
    string getName() const { return name; }
    string getEmail() const { return email; }
    
    bool verifyPassword(const string& password) const {
        // In real implementation, use bcrypt
        return passwordHash == password;
    }
    
    void display() const override {
        cout << "User ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Email: " << email << endl;
    }
};

// ==================== Business Class ====================

class Business : public Entity {
private:
    string name;
    string category;
    string description;
    string city;
    double latitude;
    double longitude;
    string status; // NEW, VERIFIED, SUSPENDED
    int ownerId;
    string contactEmail;
    
public:
    Business(int id, string name, string category, string description,
             string city, double lat, double lon, int ownerId, string contactEmail)
        : Entity(id), name(name), category(category), description(description),
          city(city), latitude(lat), longitude(lon), ownerId(ownerId),
          contactEmail(contactEmail), status("NEW") {}
    
    string getName() const { return name; }
    string getCategory() const { return category; }
    string getStatus() const { return status; }
    int getOwnerId() const { return ownerId; }
    
    void setStatus(const string& newStatus) {
        if (newStatus == "NEW" || newStatus == "VERIFIED" || newStatus == "SUSPENDED") {
            status = newStatus;
        }
    }
    
    void updateInfo(const string& newName, const string& newDescription) {
        name = newName;
        description = newDescription;
    }
    
    void display() const override {
        cout << "Business ID: " << id << endl;
        cout << "Name: " << name << endl;
        cout << "Category: " << category << endl;
        cout << "City: " << city << endl;
        cout << "Status: " << status << endl;
        cout << "Owner ID: " << ownerId << endl;
    }
};

// ==================== Collaboration Request Class ====================

class CollaborationRequest : public Entity {
private:
    int senderBusinessId;
    int receiverBusinessId;
    string requestType;
    string message;
    string status; // PENDING, ACCEPTED, REJECTED
    
public:
    CollaborationRequest(int id, int senderId, int receiverId,
                        string type, string msg)
        : Entity(id), senderBusinessId(senderId), receiverBusinessId(receiverId),
          requestType(type), message(msg), status("PENDING") {}
    
    int getSenderBusinessId() const { return senderBusinessId; }
    int getReceiverBusinessId() const { return receiverBusinessId; }
    string getStatus() const { return status; }
    
    void accept() { status = "ACCEPTED"; }
    void reject() { status = "REJECTED"; }
    
    void display() const override {
        cout << "Request ID: " << id << endl;
        cout << "From Business: " << senderBusinessId << endl;
        cout << "To Business: " << receiverBusinessId << endl;
        cout << "Type: " << requestType << endl;
        cout << "Status: " << status << endl;
        cout << "Message: " << message << endl;
    }
};

// ==================== Notification Class ====================

class Notification : public Entity {
private:
    int userId;
    string type; // COLLAB_REQUEST, ACCEPTED, REJECTED
    string message;
    bool isRead;
    
public:
    Notification(int id, int userId, string type, string message)
        : Entity(id), userId(userId), type(type), message(message), isRead(false) {}
    
    int getUserId() const { return userId; }
    bool getIsRead() const { return isRead; }
    
    void markAsRead() { isRead = true; }
    
    void display() const override {
        cout << "Notification ID: " << id << endl;
        cout << "Type: " << type << endl;
        cout << "Message: " << message << endl;
        cout << "Read: " << (isRead ? "Yes" : "No") << endl;
    }
};

// ==================== System Manager Class ====================

class StartupEcosystemSystem {
private:
    vector<shared_ptr<User>> users;
    vector<shared_ptr<Business>> businesses;
    vector<shared_ptr<CollaborationRequest>> collaborationRequests;
    vector<shared_ptr<Notification>> notifications;
    
    int nextUserId = 1;
    int nextBusinessId = 1;
    int nextRequestId = 1;
    int nextNotificationId = 1;
    
public:
    // User Management
    shared_ptr<User> registerUser(string name, string email, string password) {
        auto user = make_shared<User>(nextUserId++, name, email, password);
        users.push_back(user);
        cout << "✅ User registered successfully!" << endl;
        return user;
    }
    
    shared_ptr<User> loginUser(string email, string password) {
        for (const auto& user : users) {
            if (user->getEmail() == email && user->verifyPassword(password)) {
                cout << "✅ Login successful!" << endl;
                return user;
            }
        }
        cout << "❌ Invalid credentials!" << endl;
        return nullptr;
    }
    
    // Business Management
    shared_ptr<Business> createBusiness(const User& owner, string name,
                                       string category, string description,
                                       string city, double lat, double lon,
                                       string contactEmail) {
        auto business = make_shared<Business>(nextBusinessId++, name, category,
                                             description, city, lat, lon,
                                             owner.getId(), contactEmail);
        businesses.push_back(business);
        cout << "✅ Business created successfully!" << endl;
        return business;
    }
    
    vector<shared_ptr<Business>> getVerifiedBusinesses() const {
        vector<shared_ptr<Business>> verified;
        for (const auto& business : businesses) {
            if (business->getStatus() == "VERIFIED") {
                verified.push_back(business);
            }
        }
        return verified;
    }
    
    vector<shared_ptr<Business>> getUserBusinesses(int userId) const {
        vector<shared_ptr<Business>> userBusinesses;
        for (const auto& business : businesses) {
            if (business->getOwnerId() == userId) {
                userBusinesses.push_back(business);
            }
        }
        return userBusinesses;
    }
    
    // Collaboration Management
    shared_ptr<CollaborationRequest> sendCollaborationRequest(
        int senderBusinessId, int receiverBusinessId,
        string requestType, string message, int senderId) {
        
        // Verify sender owns the business
        bool ownsBusiness = false;
        for (const auto& business : businesses) {
            if (business->getId() == senderBusinessId &&
                business->getOwnerId() == senderId) {
                ownsBusiness = true;
                break;
            }
        }
        
        if (!ownsBusiness) {
            cout << "❌ You don't own this business!" << endl;
            return nullptr;
        }
        
        // Check for duplicate pending requests
        for (const auto& req : collaborationRequests) {
            if (req->getSenderBusinessId() == senderBusinessId &&
                req->getReceiverBusinessId() == receiverBusinessId &&
                req->getStatus() == "PENDING") {
                cout << "❌ Pending request already exists!" << endl;
                return nullptr;
            }
        }
        
        auto request = make_shared<CollaborationRequest>(
            nextRequestId++, senderBusinessId, receiverBusinessId,
            requestType, message);
        collaborationRequests.push_back(request);
        
        // Create notification
        for (const auto& business : businesses) {
            if (business->getId() == receiverBusinessId) {
                createNotification(business->getOwnerId(), "COLLAB_REQUEST",
                                 "You received a new collaboration request");
                break;
            }
        }
        
        cout << "✅ Collaboration request sent!" << endl;
        return request;
    }
    
    bool respondToRequest(int requestId, string response, int userId) {
        for (auto& request : collaborationRequests) {
            if (request->getId() == requestId) {
                // Verify user owns receiver business
                for (const auto& business : businesses) {
                    if (business->getId() == request->getReceiverBusinessId() &&
                        business->getOwnerId() == userId) {
                        
                        if (response == "ACCEPT") {
                            request->accept();
                        } else if (response == "REJECT") {
                            request->reject();
                        }
                        
                        // Notify sender
                        for (const auto& senderBusiness : businesses) {
                            if (senderBusiness->getId() == request->getSenderBusinessId()) {
                                createNotification(senderBusiness->getOwnerId(),
                                                 response == "ACCEPT" ? "ACCEPTED" : "REJECTED",
                                                 "Your collaboration request was " + response + "ed");
                                break;
                            }
                        }
                        
                        cout << "✅ Request " << response << "ed!" << endl;
                        return true;
                    }
                }
            }
        }
        cout << "❌ Request not found or unauthorized!" << endl;
        return false;
    }
    
    // Notification Management
    void createNotification(int userId, string type, string message) {
        auto notification = make_shared<Notification>(
            nextNotificationId++, userId, type, message);
        notifications.push_back(notification);
    }
    
    vector<shared_ptr<Notification>> getUserNotifications(int userId) const {
        vector<shared_ptr<Notification>> userNotifications;
        for (const auto& notification : notifications) {
            if (notification->getUserId() == userId) {
                userNotifications.push_back(notification);
            }
        }
        return userNotifications;
    }
    
    // Display Methods
    void displayAllBusinesses() const {
        cout << "\n======= ALL BUSINESSES =======" << endl;
        for (const auto& business : businesses) {
            business->display();
            cout << "----------------------------" << endl;
        }
    }
    
    void displayUserNotifications(int userId) const {
        cout << "\n======= NOTIFICATIONS =======" << endl;
        auto userNotifs = getUserNotifications(userId);
        for (const auto& notif : userNotifs) {
            notif->display();
            cout << "----------------------------" << endl;
        }
    }
};

// ==================== Main Function (Demo) ====================

int main() {
    StartupEcosystemSystem system;
    
    cout << "====== STARTUP ECOSYSTEM DEMO ======\n" << endl;
    
    // Register users
    auto user1 = system.registerUser("John Doe", "john@test.com", "password123");
    auto user2 = system.registerUser("Jane Smith", "jane@test.com", "password456");
    
    cout << "\n--- User 1 Info ---" << endl;
    user1->display();
    
    // Login
    cout << "\n--- Login Test ---" << endl;
    auto loggedInUser = system.loginUser("john@test.com", "password123");
    
    // Create businesses
    cout << "\n--- Creating Businesses ---" << endl;
    auto business1 = system.createBusiness(*user1, "EcoTech Manufacturing",
                                          "Manufacturing",
                                          "Sustainable manufacturing solutions",
                                          "San Francisco", 37.7749, -122.4194,
                                          "contact@ecotech.com");
    
    auto business2 = system.createBusiness(*user2, "Urban Design Studio",
                                          "Design",
                                          "Creative branding and design",
                                          "New York", 40.7128, -74.0060,
                                          "hello@urbandesign.com");
    
    business1->setStatus("VERIFIED");
    business2->setStatus("VERIFIED");
    
    // Display all businesses
    system.displayAllBusinesses();
    
    // Send collaboration request
    cout << "\n--- Sending Collaboration Request ---" << endl;
    system.sendCollaborationRequest(business1->getId(), business2->getId(),
                                   "Design Collaboration",
                                   "We need packaging design for our products",
                                   user1->getId());
    
    // Display notifications
    system.displayUserNotifications(user2->getId());
    
    // Respond to request
    cout << "\n--- Responding to Request ---" << endl;
    system.respondToRequest(1, "ACCEPT", user2->getId());
    
    // Display updated notifications
    system.displayUserNotifications(user1->getId());
    
    return 0;
}
