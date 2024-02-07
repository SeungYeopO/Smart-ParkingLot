#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <vector>
#include <cstdlib>

using namespace std;

vector<vector<int>> map0;
vector<int> path;
vector<int> short_path;

void dfs(int now, int end, vector<bool> visited) {
	if (now == end) {
		short_path = path;
		return;
	}

	for (int i = 0; i < map0[now].size(); i++) {
		int next = map0[now][i];

		if (visited[next]) continue;

		visited[next] = true;
		path.push_back(next);
		dfs(next, end, visited);
		path.pop_back();
	}
}

int main(int argc, char* argv[]) {

	FILE* map_data = freopen("./map0.txt", "r", stdin);

	if (map_data == nullptr) {
		fprintf(stderr, "파일을 열 수 없습니다.\n");
		return 1;
	}

	int from, to;
	while (cin >> from >> to) {

		if (map0.size() <= max(from, to)) {
			map0.resize(max(from, to) + 1);
		}

		map0[from].push_back(to);
		if (from != to) map0[to].push_back(from);
	}

	fclose(map_data);

	for (int i = 0; i < map0.size(); i++) {
		cout << i << " : ";
		for (int j = 0; j < map0[i].size(); j++) {
			cout << map0[i][j] << " ";
		}
		cout << endl;
	}

	int map_vector_size = map0.size();
	vector<bool> visited(map_vector_size, false);

	const char* st = argv[1];
	const char* ed = argv[2];
	
	int start = atoi(st);
	int end = atoi(ed);

	path.push_back(start);
	dfs(start, end, visited);

	for (int i = 0; i < short_path.size(); i++) {
		cout << short_path[i] << " ";
	}

	cout << endl;

	FILE* map_json = fopen("./short_path.json", "w");  
	fprintf(map_json, "[\n");

	for (int i = 0; i < short_path.size(); i++) {
		int points = short_path[i];
		if(i!=short_path.size()-1) 
			fprintf(map_json, "%d,\n", short_path[i]);
		else
			fprintf(map_json, "%d\n", short_path[i]);
	}

	fprintf(map_json, "]\n");

	fclose(map_json); 

	return 0;

}
