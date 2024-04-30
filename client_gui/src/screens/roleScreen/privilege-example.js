export const privilegeData = {
    "privilege": [
        {
            "id": 1,
            "name": "WRITE_USER",
            "description": "Can create, update, delete users",
            "role": [
                {
                    "id": 1,
                    "name": "ROLE_BOSS",
                    "description": "Can manage all users, all actions, full acecss"
                },
                {
                    "id": 3,
                    "name": "ROLE_ADMIN",
                    "description": "Can manage all users, cannot order Gaia, limit access"
                }
            ]
        }, 
        {
            "id": 2,
            "name": "ORDER_GAIA",
            "description": "Can order Gaia",
            "role": [
                {
                    "id": 1,
                    "name": "ROLE_BOSS",
                    "description": "Can manage all users, all actions, full acecss"
                },
                {
                    "id": 2,
                    "name": "ROLE_SUBBOSS",
                    "description": "Cannot give permission access for other users"
                }
            ]
        },
        {
            "id": 3,
            "name": "READ_USER",
            "description": "Can view users",
            "role": [
                {
                    "id": 4,
                    "name": "ROLE_USER",
                    "description": "Can only view users"
                }
            ]
        }
    ]
}