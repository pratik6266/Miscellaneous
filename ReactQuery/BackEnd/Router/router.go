package Router

import (
	"net/http"
	"github.com/gorilla/mux"
	"backend/controllers"
)

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func Router() *mux.Router{
	router := mux.NewRouter()
	// Enable CORS for all routes
	router.Use(corsMiddleware)

	router.HandleFunc("/data1", controllers.GetData).Methods("GET", "OPTIONS")
	router.HandleFunc("/data2", controllers.GetData).Methods("GET", "OPTIONS")
	router.HandleFunc("/create1", controllers.PostData).Methods("POST", "OPTIONS")
	router.HandleFunc("/create2", controllers.PostData).Methods("POST", "OPTIONS")

	return router
}