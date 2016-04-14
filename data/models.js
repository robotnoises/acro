"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Sequelize = require('sequelize');
// Todo: this are Arrays because That's what sequelize is expecting...
var GAME_STATES = [
    'INPROG',
    'COMPLETE'
];
var ROUND_STAGES = [
    'ROUND_1',
    'ROUND_2',
    'ROUND_3',
    'ROUND_4',
    'ROUND_5',
    'ROUND_6',
    'FACEOFF_1',
    'FACEOFF_2',
    'FACEOFF_3'
];
var SCORE_BONUSES = [
    'NONE',
    'SPEED'
];
var BaseModel = (function () {
    function BaseModel(name) {
        this.modelName = name;
    }
    BaseModel.prototype.define = function (connection, name, model) {
        try {
            return connection.define(name, model);
        }
        catch (ex) {
            console.error(ex);
        }
    };
    return BaseModel;
}());
var User = (function (_super) {
    __extends(User, _super);
    function User(sqName) {
        _super.call(this, sqName);
        this.user_name = Sequelize.STRING;
    }
    return User;
}(BaseModel));
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(sqName) {
        _super.call(this, sqName);
        this.state = Sequelize.ENUM(GAME_STATES);
        this.winner = Sequelize.INTEGER;
    }
    return Game;
}(BaseModel));
var Round = (function (_super) {
    __extends(Round, _super);
    function Round(sqName) {
        _super.call(this, sqName);
        this.stage = Sequelize.ENUM(ROUND_STAGES),
            this.acronym = Sequelize.ARRAY(Sequelize.STRING),
            this.validator = Sequelize.STRING;
    }
    return Round;
}(BaseModel));
var Score = (function (_super) {
    __extends(Score, _super);
    function Score(sqName) {
        _super.call(this, sqName);
        this.score = Sequelize.INTEGER;
        this.bonus = Sequelize.ENUM(SCORE_BONUSES);
    }
    return Score;
}(BaseModel));
var Models = (function () {
    function Models() {
        this.User = User;
        this.Game = Game;
        this.Round = Round;
        this.Score = Score;
    }
    Models.prototype.defineAll = function (connection) {
        var models = [];
        if (connection && connection.define) {
            // Define each Model
            models.push(new User('user'));
            models.push(new Game('game'));
            models.push(new Round('round'));
            models.push(new Score('score'));
            models.forEach(function (m) {
                var name = m.modelName;
                delete m.modelName;
                m.define(connection, name, m);
            });
        }
        else {
            console.error('A valid Sequelize connection is required.');
        }
    };
    return Models;
}());
exports.Models = Models;
//# sourceMappingURL=Models.js.map