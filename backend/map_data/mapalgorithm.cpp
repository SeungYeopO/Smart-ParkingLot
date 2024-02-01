#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <vector>

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

	FILE* file = freopen("C:/Users/SSAFY/Desktop/공통 프로젝트/S10P12C102/backend/map_data/map0.txt", "r", stdin);

	if (file == nullptr) {
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

	fclose(file);

	for (int i = 0; i < map0.size(); i++) {
		cout << i << " : ";
		for (int j = 0; j < map0[i].size(); j++) {
			cout << map0[i][j] << " ";
		}
		cout << endl;
	}

	int map_vector_size = map0.size();
	vector<bool> visited(map_vector_size, false);

	int start = 115, end = 1;

	path.push_back(start);
	dfs(start, end, visited);

	for (int i = 0; i < short_path.size(); i++) {
		cout << short_path[i] << " ";
	}

	cout << endl;

	return 0;

}
