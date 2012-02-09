/*
Copyright 2011 Saiyasodharan (http://saiy2k.blogspot.com/)

This file is part of the open source game, Number Maze

Number Maze is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Number Maze is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Number Maze.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * This is the core game engine which manages several sub components to
 * handle leveling, scoring, grid setup, free hand drawing, collision detection,
 * game mechanics, etc.,
*/
(function(undefined) {
    NumberMaze.CoreEngine           =   function(g) {
        var self                    =   this; 
        var gConfig                 =   NumberMaze.GameConfig;

        /** reference to the object which subscribes the game events
         *  the subsribed object should implement the following functions:
         *      gameOver(),
         *  @type object
         *  @public */
        self.delegate;

        /** Grid object that manages the numbers and their states
         *  @type NumberMaze.GridLayer
         *  @private */
        var grid                    =   new NumberMaze.GridLayer(g);

        /** line object that draws and manages the game line
         *  @type NumberMaze.GameLine
         *  @private */
        var gLine                   =   new NumberMaze.GameLine(g);
        gLine.delegate              =   self;

        this.resizeLayout           =   function(tWidth, tHeight) {
            grid.resizeLayout(tWidth, tHeight);
            gLine.resizeLayout(tWidth, tHeight);
        };

        this.addPoint               =   function(tx, ty) {
            var pt                  =   {x:tx, y:ty};
            if(gLine.addPoint(tx, ty))
                if(grid.collidesWith(pt))
                    console.log('collision detected');
        }

        this.update                 =   function(dt) {
            grid.update(dt);
            gLine.update(dt);

        };

        this.draw                   =   function(ctx) {
            ctx.clearRect(0, 0, 640, 480);
            gLine.draw(ctx);
            grid.draw(ctx);
        };

        /** callback methods to handle the events of GameLine object */
        this.lineTouched            =   function() {
        };

        this.lineExploded           =   function() {
            gLine.reset();
            grid.reset();
            self.delegate.gameOver();
        };
    };
})();  
