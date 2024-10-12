.phony: clean
clean:
	rm -r db/*

.phony: run
run:
	uvicorn scripts.chroma_query_api:app --reload
	sleep 3
	curl -X POST "http://127.0.0.1:8000/query" -H "Content-Type: application/json" -d '{"query": "What is AI?"}'