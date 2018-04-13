package main

import (
	"context"
	"fmt"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/client"
)

func main() {
	cli, err := client.NewEnvClient()
	if err != nil {
		panic(err)
	}

	// Argumentos para filtrar os containers
	args := filters.NewArgs(filters.Arg("label", "com.service.context"))

	// Opções de filtros do container
	options := types.ContainerListOptions{Filters: args}

	containers, err := cli.ContainerList(context.Background(), options)
	if err != nil {
		panic(err)
	}

	for _, container := range containers {
		fmt.Printf("%s %s %s %s\n", container.ID[:10], container.Image, container.Labels["com.service.context"])

		for _, port := range container.Ports {
			fmt.Printf("\t%s:%s", port.IP, port.PublicPort)
		}
	}
}
