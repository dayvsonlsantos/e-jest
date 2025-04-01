import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import Task from "../src/task";
import { setTimeout } from "timers/promises";

describe("#Task Test Suite", () => {
  let __logMock;
  let __task;
  beforeEach(() => {
    __logMock = jest.spyOn(console, console.log.name).mockImplementation();

    __task = new Task();
  });

  //Forma errada de fazer
  it.skip("should only run tasks that are due without fake timers", async () => {
    // Arrange
    const tasks = [
      {
        name: "Task-Will-Run-In-5-Secs",
        dueAt: new Date(Date.now() + 5000), //5secs
        fn: jest.fn()
      },
      {
        name: "Task-Will-Run-In-5-Secs",
        dueAt: new Date(Date.now() + 10000), // 10secs
        fn: jest.fn()
      }
    ];

    // Act
    __task.save(tasks.at(0));
    __task.save(tasks.at(1));

    __task.run(200); //200ms

    await setTimeout(11e3); //11_0000ms

    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  }, 15e3); // Configurar para o Jest aguarar 15 segundos nesse teste

  it("should only run tasks that are due with fake timers (fast)", async () => {
    jest.useFakeTimers();
    // Arrange
    const tasks = [
      {
        name: "Task-Will-Run-In-5-Secs",
        dueAt: new Date(Date.now() + 5000), //5secs
        fn: jest.fn()
      },
      {
        name: "Task-Will-Run-In-5-Secs",
        dueAt: new Date(Date.now() + 10000), // 10secs
        fn: jest.fn()
      }
    ];

    // Act
    __task.save(tasks.at(0));
    __task.save(tasks.at(1));

    __task.run(200); //200ms

    jest.advanceTimersByTime(4000); //4 secs
    // ninguem deve ser executado ainda
    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(6000); //6 secs
    // só a primeira tarefa, deve executar
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(10000); //10 secs
    // a segunda tarefa, deve executar
    expect(tasks.at(1).fn).toHaveBeenCalled();

    jest.useRealTimers();
  });
});
